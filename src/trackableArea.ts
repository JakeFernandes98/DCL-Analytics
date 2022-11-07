
import { TriggerComponent,TriggerBoxShape } from '@dcl/ecs-scene-utils'
import { TrackableAPI } from './api'
import { BaseTrackableMetadata, FullTrackableMetadata, joinMetadata } from './metadata'
import { gdpr, Timer } from './utils'


/**
 * Allows you to track users entering the area, and how long they are spending within the area
 *
 * @param xPos - X Coordinate for where the centre of the area is
 * @param zPos - Z Coordinate for where the centre of the area is
 * @param xSize - length of the area
 * @param ySize - height of the area
 * @param zSize - width of the area
 * @param api - A defined API
 * @param metadata - metadata
 * @param entityId - Unique identitifier for the entity
 * @returns An invisible entity
 * @public
 */
export class TrackableArea extends Entity{
    api: TrackableAPI
    entityId: string
    metadata: BaseTrackableMetadata


    constructor(xPos: number, zPos: number, xSize:number, ySize: number, zSize: number, api: TrackableAPI, entityId: string, metadata: BaseTrackableMetadata){
        super()

        this.api = api
        this.entityId = entityId
        this.metadata = metadata

        this.addComponent(new Transform({
            position: new Vector3(xPos,ySize/2,zPos)
        }))

        let timerSystem
        let startTime

        if (gdpr) {
            this.addComponent(
                new TriggerComponent(
                    new TriggerBoxShape(new Vector3(xSize,ySize,zSize), Vector3.Zero()),
                    {
                        onCameraEnter: () => {
                            timerSystem = new Timer()
                            startTime = new Date()
                            this.triggerEnterAPI(api, startTime)
                            engine.addSystem(timerSystem)
                        },
                        onCameraExit: () => {
                            this.triggerExitAPI(api, startTime, timerSystem.timer)
                            engine.removeSystem(timerSystem)
                        },
                    }
                )
            )
        }

        
    }

    private triggerExitAPI(api: TrackableAPI, start:Date, duration:double){
        if (gdpr){
            let fullMetadata: FullTrackableMetadata = joinMetadata(this.metadata, "", "EXIT", start, duration)
            api.req(fullMetadata)
        }
        
    }

    private triggerEnterAPI(api: TrackableAPI, start:Date){
        if (gdpr){
            let fullMetadata: FullTrackableMetadata = joinMetadata(this.metadata, "", "ENTER", start)
            api.req(fullMetadata)
        }
    }
}
