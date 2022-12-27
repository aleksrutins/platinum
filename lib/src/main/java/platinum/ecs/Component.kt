package platinum.ecs

import java.lang.reflect.ParameterizedType

abstract class Component<T : System?> {
    var entity: Entity? = null
    var systemType = (this.javaClass.genericSuperclass as ParameterizedType).actualTypeArguments[0] as Class<*>
    fun canUse(tS: Class<out System?>): Boolean {
        return tS == systemType
    }

    abstract fun init(system: System?)
    abstract fun update(system: System)
    protected inline fun <reified C : Component<*>> getComponent(): C? {
        return entity!!.getComponent()
    }

    protected inline fun <reified C : Component<*>> hasComponent(): Boolean {
        return entity!!.hasComponent<C>()
    }
}