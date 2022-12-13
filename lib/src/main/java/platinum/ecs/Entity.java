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
    }

    public boolean detach(Component<?> component) {
        return components.remove(component);
    }

    public void detachAll(Class<? extends Component<?>> clazz) {
        for (Component<?> component : components) {
            if(clazz.isAssignableFrom(component.getClass())) detach(component);
        }
    }
}
