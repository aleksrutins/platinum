package platinum.math

object Util {
    fun lerp(a: Float, b: Float, t: Float): Float {
        return a + t * (b - a)
    }
}