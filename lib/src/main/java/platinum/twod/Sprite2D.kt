package platinum.twod

import platinum.ecs.Component
import platinum.ecs.System
import java.awt.Color
import java.awt.image.BufferedImage

class Sprite2D(var image: BufferedImage) : Component<RenderSystem2D?>() {

    override fun init(system: System?) {}
    override fun update(system: System) {
        val transform = getComponent<Transform2D>() ?: return
        (system as RenderSystem2D).graphics2D!!.drawImage(image, transform.actXi, transform.actYi, image.width, image.height, Color(0, 0, 0, 0), null)
    }
}