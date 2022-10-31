import { TrackableAPI } from "./api";
import { BaseTrackableMetadata, FullTrackableMetadata, joinMetadata } from "./metadata";

export class TrackableCamera {

    raySystem: RaycastingSystem


    constructor(api: TrackableAPI){
        this.raySystem = new RaycastingSystem(api)
        engine.addSystem(this.raySystem)
    }

    /**
     * Allows you to add an entity that you want to track
     *
     * @param entity - the entity you want to track
     * @param tag - metadata.
     * @param entityId - Unique identitifier for the entity
     * @public
     */
    addEntity(entity:Entity, tag: BaseTrackableMetadata, entityId: string){
        this.raySystem.addEntity(entity,tag,entityId)
    }

    /**
     * Removes an entity from being tracked
     *
     * @param entity - the entity you don't want to track anymore
     * @public
     */
    removeEntity(entity:Entity){
        this.raySystem.removeEntity(entity)
    }

}

class RaycastingSystem implements ISystem {

    entities: {}
    entitiesCount: {}
    api: TrackableAPI

    constructor(api: TrackableAPI){
        this.api = api
        this.entities = {}
        this.entitiesCount = {}
    }

    addEntity(entity:Entity, tag: BaseTrackableMetadata, entityId: string){
        let metadata: FullTrackableMetadata = joinMetadata(tag, entityId, "VIEW")
        this.entities[entity.uuid] = metadata
        this.entitiesCount[entity.uuid] = 0
    }

    removeEntity(entity:Entity){
        delete this.entities[entity.uuid]
        delete this.entitiesCount[entity.uuid]
    }

    update(dt: number){
        let ray: Ray = PhysicsCast.instance.getRayFromCamera(30)
  
        PhysicsCast.instance.hitAll(
            ray,
            (e) => {
                if (e.didHit){
                    for (let ent of e.entities){
                        let entityuuid:string = ent.entity.entityId.charAt(0) + String.fromCharCode(ent.entity.entityId.charCodeAt(1)-3)
                        if (this.entities.hasOwnProperty(entityuuid)){
                            this.entitiesCount[entityuuid] = this.entitiesCount[entityuuid] + dt
                        }
                    }
                } else {
                    this.sendAPI()
                }
            }
        )
    }

    sendAPI(){
        for (let obj of Object.keys(this.entities)){
            let metadata = this.entities[obj]
            let count = this.entitiesCount[obj]
            if (count != 0){
                metadata["timestamp"] = new Date()
                metadata["duration"] = count
                this.api.req(metadata)
                this.entitiesCount[obj] = 0
            }
        }
    }
}