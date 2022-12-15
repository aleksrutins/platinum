package platinum.twod;

import platinum.ecs.Entity;
import platinum.math.Vec2;

public class CameraEntity2D extends Entity {
    private int sceneWidth;
    private int sceneHeight;

    public CameraEntity2D(String name, int sceneWidth, int sceneHeight) {
        super(name);
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        attach(new Transform2D(0, 0));
        attach(new Camera2D());
    }

    public void follow(Transform2D thing, float lerpFactor) {
        var transform = getComponent(Transform2D.class);
        var modified = Vec2.add(thing.getPosition(), new Vec2(-sceneWidth/2f, -sceneHeight/2f));
        transform.setPosition(Vec2.lerp(transform.getPosition(), modified, lerpFactor));
    }
    
}
