export interface BaseTrackableMetadata {
    readonly parcelId: string;
    readonly sectionId: string;
    readonly userId: string;
    readonly userName: string;
    readonly userGuest: boolean;
}

export interface FullTrackableMetadata extends BaseTrackableMetadata {
    readonly entityId: string;
    readonly action: string;
    timestamp: Date;
    duration?: number;

}

export function joinMetadata(base: BaseTrackableMetadata, entityId: string, action: string, timestamp: Date, duration?: number) {
    let metadata = {
       parcelId : base.parcelId,
       sectionId : base.sectionId,
       userId : base.userId,
       userName : base.userName,
       userGuest : base.userGuest,
       entityId : entityId,
       action : action,
       timestamp : timestamp,
    } as FullTrackableMetadata


    if (typeof duration !== undefined){
        metadata.duration = duration
    }

    return metadata

    

}