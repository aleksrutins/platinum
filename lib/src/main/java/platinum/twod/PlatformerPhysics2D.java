package platinum.twod;

import platinum.ecs.Component;
import platinum.ecs.System;
import platinum.math.Vec2;
import platinum.twod.collision.CollisionBox2D;

public class PlatformerPhysics2D extends Component<RenderSystem2D> {
    final float fallSpeed = 0.05f;
    final float jumpSpeed = 3f;

    @Override
    public void init(System system) {

    }

    @Override
    public void update(System system) {
        var collisionBox = getComponent(CollisionBox2D.class);
        var transform = getComponent(Transform2D.class);
        if(collisionBox == null || transform == null) {
            return;
        }

        if(!collisionBox.hasCollision()) {
            transform.delta = Vec2.add(transform.delta, new Vec2(0, fallSpeed));
        } else {
            transform.delta = new Vec2(transform.delta.x(), 0);
        }
    }

    public void jump() {
        var transform = getComponent(Transform2D.class);
        if(transform == null) return;
        transform.delta = Vec2.add(transform.delta, new Vec2(0, -jumpSpeed));
    }
}