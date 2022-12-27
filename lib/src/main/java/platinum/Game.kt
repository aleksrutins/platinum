package platinum

import platinum.ecs.Entity
import platinum.ecs.System
import platinum.extension.GameExtension
import java.awt.GraphicsEnvironment
import java.util.*
import java.util.function.Consumer

open class Game {
    val systems: MutableList<System> = ArrayList()
    val baseEntities: MutableList<Entity> = ArrayList()
    private var scene: Scene? = null
    fun getEntities(): List<Entity> {
        val result = ArrayList<Entity>()
        result.addAll(baseEntities)
        if (scene != null) {
            result.addAll(scene!!.entities)
        }
        return result
    }

    fun <T : System> use(system: T) {
        systems.add(system)
        System.gamesMap[system] = this
        system.init(this)
    }

    fun <T : GameExtension> useExt(extension: T) {
        extension.connect(this)
    }

    fun <T : Entity> add(entity: T) {
        baseEntities.add(entity)
        entity.init(systems)
    }

    fun addAll(entities: Collection<Entity>) {
        for (entity in entities) {
            this.baseEntities.add(entity)
            entity.init(systems)
        }
    }

    fun remove(entity: Entity?) {
        baseEntities.remove(entity)
        if (scene != null) scene!!.entities.remove(entity)
    }

    fun clear() {
        baseEntities.clear()
    }

    fun switchScene(scene: Scene?) {
        this.scene = scene
    }

    private fun updateAll() {
        systems.forEach(Consumer { obj: System -> obj.update() })
    }

    @Suppress("UNCHECKED_CAST")
    inline operator fun <reified T : Entity> get(name: String): T? {
        return baseEntities.firstOrNull { e -> T::class.java.isAssignableFrom(e.javaClass) && e.name == name } as T?
    }

    @Suppress("UNCHECKED_CAST")
    inline fun <reified T : System?> getSystem(): T? {
        return systems.firstOrNull { e: System -> T::class.java.isAssignableFrom(e.javaClass) } as T?
    }

    protected inner class MainLoop(private val cb: (Game) -> Boolean) : TimerTask() {
        override fun run() {
            val shouldContinue = cb(this@Game)
            updateAll()
            if (!shouldContinue) cancel()
        }
    }

    @JvmOverloads
    fun mainLoop(refreshRate: Int = GraphicsEnvironment.getLocalGraphicsEnvironment().defaultScreenDevice.displayMode.refreshRate, cb: (Game) -> Boolean) {
        val timer = Timer("Platinum-MainLoop")
        timer.scheduleAtFixedRate(MainLoop(cb), 0, (1000 / refreshRate).toLong()) // 60 frames per second
    }
}