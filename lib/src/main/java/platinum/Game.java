package platinum;

import platinum.ecs.Entity;
import platinum.ecs.System;
import platinum.extension.GameExtension;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class Game {
    private List<System> systems = new ArrayList<>();
    private List<Entity> entities = new ArrayList<>();
    private Scene scene = null;
    public List<Entity> getEntities() {
        var result = new ArrayList<Entity>();
        result.addAll(entities);
        if(scene != null) {
            result.addAll(scene.entities);
        }
        return result;
    }

    public <T extends System> void use(T system) {
        systems.add(system);
        system.init(this);
    }

    public <T extends GameExtension> T useExt(Class<T> extension) throws NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException {
        var ext = extension.getConstructor().newInstance();
        ext.connect(this);
        return ext;
    }

    // public <T extends GameExtension> void useExt(T extension);

    public <T extends Entity> void add(T entity) {
        entities.add(entity);
    }

    public void addAll(Collection<Entity> entities) {
        this.entities.addAll(entities);
    }

    public void remove(Entity entity) {
        entities.remove(entity);
        if(scene != null) scene.entities.remove(entity);
    }

    public void clear() {
        entities.clear();
    }

    public void switchScene(Scene scene) {
        this.scene = scene;
    }

    private void updateAll() {
        systems.forEach(System::update);
        entities.forEach(entity -> entity.update(systems));
        systems.forEach(System::postUpdate);
    }

    @SuppressWarnings({"unchecked"})
    public <T extends Entity> Optional<T> get(Class<T> t, String name) {
        return (Optional<T>) entities.stream().filter(e -> t.isAssignableFrom(e.getClass()) && e.getName().equals(name)).findFirst();
    }

    @SuppressWarnings({"unchecked"})
    public <T extends System> Optional<T> getSystem(Class<T> t) {
        return (Optional<T>) systems.stream().filter(e -> t.isAssignableFrom(e.getClass())).findFirst();
    }

    public void mainLoop(Function<Game, Boolean> cb) {
        var shouldContinue = true;
        do {
            shouldContinue = cb.apply(this);
            updateAll();
        } while (shouldContinue);
    }
}
