import { getUserData } from "@decentraland/Identity"

export interface BaseTrackableMetadata {
    readonly parcelId: string
    readonly sectionId: string
    readonly userId: string
    readonly userName: string
    readonly userGuest: boolean
}

export interface FullTrackableMetadata extends BaseTrackableMetadata {
    readonly entityId: string
    readonly action: string
    timestamp: Date
    duration?: number

}

/**
 * Generates a BaseTrackableMetadata object based on the parcelId and sectionId provided
 * and deals with sourcing player info internally
 * 
 * @param parcelId - Unique Identifier for the parcel
 * @param sectionId - Unique Identifier for the section of the experience
 * @returns BaseTrackableMetadata with all fields filled in
 * @public
 */
export function generateMetadata(parcelId:string, sectionId:string) {
    let playerInfo
    executeTask(async () => {
        playerInfo = await getUserData()
    })
    let isUserGuest = !(playerInfo.hasConnectedWeb3)
    let metadata: BaseTrackableMetadata = {
        parcelId: parcelId,
        sectionId: sectionId,
        userId: isUserGuest ? playerInfo.userId : playerInfo.publicKey,
        userName: playerInfo.displayName,
        userGuest: isUserGuest
    }

    return metadata

}

/**
 * Allows you to create a FullTrackableMetadata object from a BaseTrackableMetadata object
 * and the extra fields.
 * 
 * @param parcelId - Unique Identifier for the parcel
 * @param sectionId - Unique Identifier for the section of the experience
 * @returns BaseTrackableMetadata with all fields filled in
 * @public
 */
export function joinMetadata(base: BaseTrackableMetadata, entityId: string, action: string, timestamp?: Date, duration?: number) {
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


    if (typeof timestamp !== undefined){
        metadata.timestamp = timestamp
    }

    if (typeof duration !== undefined){
        metadata.duration = duration
    }

    return metadata

    

}