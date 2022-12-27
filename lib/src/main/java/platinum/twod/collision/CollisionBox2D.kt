package platinum.twod.collision

import platinum.ecs.Component
import platinum.ecs.System
import platinum.math.Vec2
import platinum.twod.RenderSystem2D
import platinum.twod.Sprite2D
import platinum.twod.Transform2D

class CollisionBox2D @JvmOverloads constructor(var type: CollisionType, var width: Int = -1, var height: Int = -1) : Component<RenderSystem2D?>() {
    private var system: RenderSystem2D? = null
    override fun init(system: System?) {
        this.system = system as RenderSystem2D?
        val sprite = getComponent<Sprite2D>()
        if (sprite != null && width < 0 && height < 0) {
            width = sprite.image.width
            height = sprite.image.height
        }
    }

    override fun update(system: System) {
        val transform = getComponent<Transform2D>() ?: return
        if (type == CollisionType.MOVABLE) {
            val otherBoxes = system.game!!.baseEntities.filter { it !== entity && it.hasComponent<CollisionBox2D>() }.map { it.getComponent<CollisionBox2D>() }
            for (box in otherBoxes) {
                if (box != null && box.type != CollisionType.PASS_THROUGH && box.type != CollisionType.DO_NOT_AVOID && overlaps(box)) {
                    while (overlaps(box)) transform.rollback()
                }
            }
        }
    }

    fun hasCollision(): Boolean {
        if (system == null) return false
        val otherBoxes = system!!.game!!.baseEntities.filter { it !== entity && it.hasComponent<CollisionBox2D>() }.map { it.getComponent<CollisionBox2D>() }
        for (box in otherBoxes) {
            if (box != null && box.type != CollisionType.PASS_THROUGH && overlaps(box)) {
                return true
            }
        }
        return false
    }

    fun overlapsPoint(point: Vec2): Boolean {
        val transform = getComponent<Transform2D>() ?: return false
        return transform.x < point.x && point.x < transform.x + width && transform.y < point.y && point.y < transform.y + height
    }

    fun overlaps(otherBox: CollisionBox2D): Boolean {
        val thisTransform = getComponent<Transform2D>() ?: return false
        val otherTransform = otherBox.getComponent<Transform2D>() ?: return false
        return (
            if (otherBox === this)
                false
            else
                thisTransform.x < otherTransform.x + otherBox.width
                        && thisTransform.x + width > otherTransform.x
                        && thisTransform.y < otherTransform.y + otherBox.height
                        && thisTransform.y + height > otherTransform.y
                )

        // see https://gamedev.stackexchange.com/a/169234 and https://silentmatt.com/rectangle-intersection/
        // no collision
    }
}