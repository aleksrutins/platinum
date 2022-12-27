package platinum.twod

import platinum.ecs.Component
import platinum.ecs.System
import platinum.math.Vec2

class Transform2D(var x: Float, var y: Float) : Component<RenderSystem2D?>() {
    var xMod = 0f
    var yMod = 0f
    var delta = Vec2(0f, 0f)
    var position: Vec2
        get() = Vec2(x, y)
        set(newPos) {
            history.add(position)
            while (history.size > 20) history.removeAt(0)
            x = newPos.x
            y = newPos.y
        }
    private val history: MutableList<Vec2> = ArrayList()
    fun translate(vec: Vec2) {
        position = Vec2.Companion.add(position, vec)
    }

    val xi: Int
        get() = Math.round(x)
    val yi: Int
        get() = Math.round(y)
    val actX: Float
        get() = x + xMod
    val actXi: Int
        get() = Math.round(actX)
    val actY: Float
        get() = y + yMod
    val actYi: Int
        get() = Math.round(actY)

    fun rollback() {
        var last = history.removeAt(history.size - 1)
        if (last == null) last = position
        x = last.x
        y = last.y
    }

    override fun init(system: System?) {}
    override fun update(system: System) {
        translate(delta)
    }
}