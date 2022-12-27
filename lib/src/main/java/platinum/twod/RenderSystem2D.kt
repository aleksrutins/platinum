package platinum.twod

import platinum.Game
import platinum.ecs.Entity
import platinum.ecs.System
import java.awt.Color
import java.awt.Graphics
import java.awt.Graphics2D
import java.util.function.Consumer
import javax.swing.JComponent

class RenderSystem2D : JComponent(), System {
    var clearColor = Color.BLACK
    var graphics2D: Graphics2D? = null
    private val effects: MutableCollection<PostRenderEffect> = ArrayList()
    fun addEffect(effect: PostRenderEffect) {
        effects.add(effect)
    }

    override fun paint(g: Graphics) {
        val g2d = g as Graphics2D
        graphics2D = g2d
        val bounds = g2d.deviceConfiguration.bounds
        g2d.background = clearColor
        g2d.clearRect(0, 0, bounds.width, bounds.height)
        game!!.baseEntities.forEach(Consumer { entity: Entity? -> entity!!.update(this) })
        effects.forEach(Consumer { e: PostRenderEffect -> e.update(this) })
    }

    override fun init(game: Game?) {
        effects.forEach(Consumer { e: PostRenderEffect -> e.init(this) })
    }

    override fun update() {
        repaint()
    }
}