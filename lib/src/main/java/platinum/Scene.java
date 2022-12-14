package platinum;

import platinum.ecs.Entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class Scene {
    public List<Entity> entities = new ArrayList<>();
    public void add(Entity entity) {
        entities.add(entity);
    }
    public void addAll(Collection<Entity> entities) {
        this.entities.addAll(entities);
    }
}
