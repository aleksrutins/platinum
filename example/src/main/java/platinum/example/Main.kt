package platinum.example

import platinum.Game
import platinum.ecs.Entity
import platinum.input.KeyboardManager
import platinum.math.Vec2
import platinum.twod.*
import platinum.twod.collision.CollisionBox2D
import platinum.twod.collision.CollisionType
import platinum.twod.level.*
import java.awt.Dimension
import java.awt.event.KeyEvent
import javax.imageio.ImageIO
import javax.swing.JFrame

object Main {
    @Throws(Exception::class)
    @JvmStatic
    fun main(args: Array<String>) {
        val game = Game()
        val wnd = JFrame("Platinum Example")
        wnd.preferredSize = Dimension(640, 480)
        val kbd = KeyboardManager(wnd)
        val img = ImageIO.read(Main::class.java.getResource("/platinum/example/player.png"))
        val tilemapImg = ImageIO.read(Main::class.java.getResource("/platinum/example/tilemap.png"))
        val tiles = LevelLoader.load(Level("main", arrayOf(
                TileInfo(0, 15f, 75f, CollisionType.DO_NOT_AVOID),
                TileInfo(1, 57f, 57f, CollisionType.PASS_THROUGH),
                TileInfo(1, 98f, 73f, CollisionType.PASS_THROUGH)
        ), arrayOf(
                LevelEntity("player", 25f, 25f)
        )), TilemapInfo(
                tilemapImg,
                5, 1,
                32, 32
        )) { name: String, transform: Transform2D ->
            when (name) {
                "player" -> {
                    val player = Entity("player")
                    player.attach(transform)
                    player.attach(Sprite2D(img))
                    player.attach(CollisionBox2D(CollisionType.DO_NOT_AVOID, 32, 32))
                    player.attach(PlatformerPhysics2D())
                    player
                }

                else -> null
            }
        }
        val renderer = RenderSystem2D()
        val camera = CameraEntity2D("camera", 640, 480)
        game.use(renderer)
        game.addAll(tiles)
        game.add(camera)
        wnd.add(renderer)
        wnd.pack()
        wnd.defaultCloseOperation = JFrame.EXIT_ON_CLOSE
        wnd.isResizable = false
        wnd.isVisible = true
        game.mainLoop { _ ->
            val entity = game.get<Entity>("player")!!
            val transform = entity.getComponent<Transform2D>()!!
            val platformer = entity.getComponent<PlatformerPhysics2D>()!!
            val collisionBox = entity.getComponent<CollisionBox2D>()!!
            if (kbd.isDown(KeyEvent.VK_RIGHT) || kbd.isDown(KeyEvent.VK_D)) {
                transform.translate(Vec2(5f, 0f))
            } else if (kbd.isDown(KeyEvent.VK_LEFT) || kbd.isDown(KeyEvent.VK_A)) {
                transform.translate(Vec2(-5f, 0f))
            }
            if ((kbd.isDown(KeyEvent.VK_UP) || kbd.isDown(KeyEvent.VK_W)) && collisionBox.hasCollision()) {
                platformer.jump()
            }
            camera.follow(transform, 0.1f)
            true
        }
    }
}