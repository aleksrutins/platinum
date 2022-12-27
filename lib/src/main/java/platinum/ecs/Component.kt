package platinum.ecs;

import java.lang.reflect.ParameterizedType;

public abstract class Component<T extends System> {
    protected Entity entity;
    @SuppressWarnings({"unchecked"})
    Class<T> systemType = (Class<T>) ((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    public boolean canUse(Class<? extends System> tS) {
        return tS == systemType;
    }
    public abstract void init(System system);
    public abstract void update(System system);
    protected <C extends Component<?>> C getComponent(Class<C> type) {
        return entity.getComponent(type);
    }
    protected <C extends Component<?>> boolean hasComponent(Class<C> type) {
        return entity.hasComponent(type);
    }
}
