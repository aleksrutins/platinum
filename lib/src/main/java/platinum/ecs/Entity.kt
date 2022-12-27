package platinum.ecs;

import java.util.ArrayList;
import java.util.List;

public class Entity {
    private List<Component<?>> components = new ArrayList<>();
    private String name;
    public String getName() {
        return name;
    }
    public Entity(String name) {
        this.name = name;
    }
    public void attach(Component<?> component) {
        components.add(component);
        component.entity = this;
    }

    public boolean detach(Component<?> component) {
        component.entity = null;
        return components.remove(component);
    }

    public void detachAll(Class<? extends Component<?>> clazz) {
        for (Component<?> component : components) {
            if(clazz.isAssignableFrom(component.getClass())) detach(component);
        }
    }

    @SuppressWarnings({"unchecked"})
    public <T extends Component<?>> T getComponent(Class<T> type) {
        for (Component<?> component : components) {
            if(component.getClass() == type) return (T)component;
        }
        return null;
    }

    public List<Component<?>> getComponents() {
        return components;
    }

    public boolean hasComponent(Class<? extends Component<?>> type) {
        return getComponent(type) != null;
    }

    public void init(List<System> systems) {
        for (Component<?> component : components) {
            for (System system : systems) {
                if(component.canUse(system.getClass())) component.init(system);
            }
        }
    }

    public void update(System system) {
        for (Component<?> component : components) {
            if(component.canUse(system.getClass())) component.update(system);
        }
    }
}
