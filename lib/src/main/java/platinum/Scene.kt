package platinum

import platinum.ecs.Entity

class Scene {
    var entities: MutableList<Entity> = ArrayList()
    fun add(entity: Entity) {
        entities.add(entity)
    }

    fun addAll(entities: Collection<Entity>) {
        this.entities.addAll(entities)
    }
}