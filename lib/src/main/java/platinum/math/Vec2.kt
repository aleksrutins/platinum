package platinum.math

data class Vec2(val x: Float, val y: Float) {
    companion object {
        fun add(a: Vec2?, b: Vec2): Vec2 {
            return Vec2(a!!.x + b.x, a.y + b.y)
        }

        fun lerp(a: Vec2?, b: Vec2, t: Float): Vec2 {
            return Vec2(Util.lerp(a!!.x, b.x, t), Util.lerp(a.y, b.y, t))
        }
    }
}