package platinum.twod

import platinum.ecs.Entity
import platinum.math.Vec2

class CameraEntity2D(name: String, private val sceneWidth: Int, private val sceneHeight: Int) : Entity(name) {
    init {
        attach(Transform2D(0f, 0f))
        attach(Camera2D())
    }

    fun follow(thing: Transform2D, lerpFactor: Float) {
        val transform = getComponent<Transform2D>()!!
        val modified: Vec2 = Vec2.Companion.add(thing.position, Vec2(-sceneWidth / 2f, -sceneHeight / 2f))
        transform.position = Vec2.Companion.lerp(transform.position, modified, lerpFactor)
    }
}