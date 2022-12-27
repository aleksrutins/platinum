package platinum.twod

interface PostRenderEffect {
    fun init(system: RenderSystem2D?)
    fun update(system: RenderSystem2D?)
}