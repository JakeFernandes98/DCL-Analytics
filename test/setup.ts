import * as ecs from 'decentraland-ecs'

type Ecs = { self: typeof ecs }
/**
 * Override @Entity for testing purpose.
 */
const Entity = (ecs as any as Ecs).self.Entity
;(globalThis as any).Entity = Entity