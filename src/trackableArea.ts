
// import {TriggerComponent,TriggerBoxShape } from '@dcl/ecs-scene-utils'

export class TrackableArea extends Entity{

    constructor(x: number, y: number, z: number){
        super()

        this.addComponent(new Transform({
            position: new Vector3(x/2,y/2,z/2)
        }))

        // this.addComponent(
        //     new TriggerComponent(
        //         new TriggerBoxShape(new Vector3(x,y,z), Vector3.Zero()),
        //         {
        //             onCameraEnter: () => {
                        
        //             },
        //             onCameraExit: () => {
            
        //             },
        //         }
        //     )
        // )
        

    }
}