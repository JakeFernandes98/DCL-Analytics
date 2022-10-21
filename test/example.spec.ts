import { Entity } from 'decentraland-ecs'
import { BaseTrackableMetadata } from '../src/metadata'
import { TrackableEntity } from '../src/trackableEntity'

describe('Example spec', () => {
  (globalThis as any).Entity = Entity

  it('Should return component', () => {
    let metadata:BaseTrackableMetadata = {
        parcelId: "3",
        sectionId: "2",
        userId: "0x56",
        userName: "jake",
        userGuest: false
    }
    const component = new TrackableEntity(metadata, "1")
    expect(component.entityId).toBe("1")
  })
})