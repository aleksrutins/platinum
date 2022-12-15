package platinum;

import platinum.ecs.Entity;
import platinum.ecs.System;
import platinum.extension.GameExtension;

import java.util.*;
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
        System.gamesMap.put(system, this);
        system.init(this);
    }

    public <T extends GameExtension> void useExt(T extension) {
        extension.connect(this);
    }

    public <T extends Entity> void add(T entity) {
        entities.add(entity);
        entity.init(systems);
    }

    public void addAll(Collection<Entity> entities) {
        for(Entity entity : entities) {
            this.entities.add(entity);
            entity.init(systems);
        }
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
    }

    @SuppressWarnings({"unchecked"})
    public <T extends Entity> Optional<T> get(Class<T> t, String name) {
        return (Optional<T>) entities.stream().filter(e -> t.isAssignableFrom(e.getClass()) && e.getName().equals(name)).findFirst();
    }

    @SuppressWarnings({"unchecked"})
    public <T extends System> Optional<T> getSystem(Class<T> t) {
        return (Optional<T>) systems.stream().filter(e -> t.isAssignableFrom(e.getClass())).findFirst();
    }

    protected class MainLoop extends TimerTask {
        private final Function<Game, Boolean> cb;
        public MainLoop(Function<Game, Boolean> cb) {
            this.cb = cb;
        }
        @Override
        public void run() {
            boolean shouldContinue = cb.apply(Game.this);
            updateAll();
            if(!shouldContinue) cancel();
        }
    }

    public void mainLoop(Function<Game, Boolean> cb, int refreshRate) {
        var timer = new Timer("Platinum-MainLoop");
        timer.scheduleAtFixedRate(new MainLoop(cb), 0, 1000 / refreshRate); // 60 frames per second
    }

    public void mainLoop(Function<Game, Boolean> cb) {
        mainLoop(cb, java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice().getDisplayMode().getRefreshRate());
    }
}
