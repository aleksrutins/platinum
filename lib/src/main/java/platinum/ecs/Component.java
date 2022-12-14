package platinum.ecs;

import java.lang.reflect.ParameterizedType;

public abstract class Component<T extends System> {
    Entity entity;
    @SuppressWarnings({"unchecked"})
    Class<T> systemType = (Class<T>) ((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    public boolean canUse(Class<? extends System> tS) {
        return tS == systemType;
    }
    abstract void init(System system);
    abstract void update(System system);
    <C extends Component<?>> C getComponent(Class<C> type) {
        return entity.getComponent(type);
    }
    <C extends Component<?>> boolean hasComponent(Class<C> type) {
        return entity.hasComponent(type);
    }
}
