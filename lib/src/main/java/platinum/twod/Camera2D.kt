package platinum.twod

import platinum.ecs.Component
import platinum.ecs.System

class Camera2D : Component<RenderSystem2D?>() {
    override fun init(system: System?) {}
    override fun update(system: System) {
        if (!hasComponent<Transform2D>()) return
        for (transform in system.game!!.baseEntities
                .filter { it.hasComponent<Transform2D>() }
                .map { it.getComponent<Transform2D>()!! }) {
            transform.xMod = 0 - getComponent<Transform2D>()!!.x
            transform.yMod = 0 - getComponent<Transform2D>()!!.y
        }
    }
}