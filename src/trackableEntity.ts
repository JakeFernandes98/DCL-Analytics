import { TrackableAPI } from "./api"
import { BaseTrackableMetadata, FullTrackableMetadata, joinMetadata } from "./metadata"
import { gdpr } from "./utils"
// @Entity('exampleComponent')

/**
 * Creates an Entity, from where clicks can be tracked via the enableTracking method
 *
 * @param metadata - metadata
 * @param entityId - Unique identitifier for the entity
 * @returns a new Entity
 * @public
 */
export class TrackableEntity extends Entity {

    metadata: BaseTrackableMetadata
    entityId: string



    constructor(metadata:BaseTrackableMetadata, entityId:string){
        super()
        this.metadata = metadata
        this.entityId = entityId
    }

    /**
     * Allows clicks to be tracked. Method must be called within the event handler component (e.g. OnPointerUp, OnPointerDown)
     *
     * @param api - A defined API
     * @public
     */
    enableTracking(api: TrackableAPI){
        if (gdpr){
            let body: FullTrackableMetadata = joinMetadata(this.metadata, this.entityId, 'INTERACT', new Date())
            api.req(body)
        }
    }
}