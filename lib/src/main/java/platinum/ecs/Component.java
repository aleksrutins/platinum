package platinum.ecs;

import java.lang.reflect.ParameterizedType;

public abstract class Component<T extends System> {
    Entity entity;
    @SuppressWarnings({"unchecked"})
    Class<T> systemType = (Class<T>) ((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    boolean canUse(Class<? extends System> tS) {
        return tS == systemType;
    }
    abstract void init(T system);
    abstract void update(T system);
}
