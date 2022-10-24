
import { TriggerComponent,TriggerBoxShape } from '@dcl/ecs-scene-utils'
import { TrackableAPI } from './api'
import { BaseTrackableMetadata, FullTrackableMetadata, joinMetadata } from './metadata'
import { Timer } from './utils'

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

    triggerExitAPI(api: TrackableAPI, start:Date, duration:double){
        let fullMetadata: FullTrackableMetadata = joinMetadata(this.metadata, "", "EXIT", start, duration)
        api.req(fullMetadata)
    }

    triggerEnterAPI(api: TrackableAPI, start:Date){
        let fullMetadata: FullTrackableMetadata = joinMetadata(this.metadata, "", "ENTER", start)
        api.req(fullMetadata)
    }
}
