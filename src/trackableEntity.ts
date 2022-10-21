import { TrackableAPI } from "./api"
import { BaseTrackableMetadata, FullTrackableMetadata, joinMetadata } from "./metadata"
// @Entity('exampleComponent')
export class TrackableEntity extends Entity {

    metadata: BaseTrackableMetadata
    entityId: string

    constructor(metadata:BaseTrackableMetadata, entityId:string){
        super()
        this.metadata = metadata
        this.entityId = entityId
    }

    enableTracking(api: TrackableAPI){
        let body: FullTrackableMetadata = joinMetadata(this.metadata, this.entityId, 'INTERACT', new Date())
        api.req(body)
    }
}