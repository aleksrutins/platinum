package platinum.ecs

open class Entity(val name: String) {
    val components: MutableList<Component<*>> = ArrayList()

    fun attach(component: Component<*>) {
        components.add(component)
        component.entity = this
    }

    fun detach(component: Component<*>): Boolean {
        component.entity = null
        return components.remove(component)
    }

    fun detachAll(clazz: Class<out Component<*>?>) {
        for (component in components) {
            if (clazz.isAssignableFrom(component.javaClass)) detach(component)
        }
    }

    inline fun <reified T : Component<*>> getComponent(): T? {
        for (component in components) {
            if (component.javaClass == T::class.java) return component as T
        }
        return null
    }

    inline fun <reified T : Component<*>> hasComponent(): Boolean {
        return getComponent<T>() != null
    }

    fun init(systems: List<System>) {
        for (component in components) {
            for (system in systems) {
                if (component.canUse(system.javaClass)) component.init(system)
            }
        }
    }

    fun update(system: System) {
        for (component in components) {
            if (component.canUse(system.javaClass)) component.update(system)
        }
    }
}