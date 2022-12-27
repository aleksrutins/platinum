package platinum.twod

import platinum.ecs.Component
import platinum.ecs.System
import platinum.math.Vec2
import platinum.twod.collision.CollisionBox2D

class PlatformerPhysics2D : Component<RenderSystem2D?>() {
    val fallSpeed = 0.05f
    val jumpSpeed = 3f
    override fun init(system: System?) {}
    override fun update(system: System) {
        val collisionBox = getComponent<CollisionBox2D>();
        val transform = getComponent<Transform2D>();
        if (collisionBox == null || transform == null) {
            return
        }
        if (collisionBox.hasCollision()) {
            transform.delta = Vec2(transform.delta.x, 0f)
        } else {
            transform.delta = Vec2.Companion.add(transform.delta, Vec2(0f, fallSpeed))
        }
    }

    fun jump() {
        val transform = getComponent<Transform2D>() ?: return
        transform.delta = Vec2.Companion.add(transform.delta, Vec2(0f, -jumpSpeed))
    }
}