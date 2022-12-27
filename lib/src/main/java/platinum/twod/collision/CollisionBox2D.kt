package platinum.twod.collision;

import platinum.ecs.Component;
import platinum.ecs.System;
import platinum.math.Vec2;
import platinum.twod.RenderSystem2D;
import platinum.twod.Sprite2D;
import platinum.twod.Transform2D;

public class CollisionBox2D extends Component<RenderSystem2D> {
    private RenderSystem2D system;
    public CollisionType type;
    public int width;
    public int height;

    public CollisionBox2D(CollisionType type, int width, int height) {
        super();
        this.type = type;
        this.width = width;
        this.height = height;
    }

    public CollisionBox2D(CollisionType type) {
        this(type, -1, -1);
    }

    @Override
    public void init(System system) {
        this.system = (RenderSystem2D) system;

        var sprite = getComponent(Sprite2D.class);
        if(sprite != null && width < 0 && height < 0) {
            width = sprite.getImage().getWidth();
            height = sprite.getImage().getHeight();
        }
    }

    @Override
    public void update(System system) {
        var transform = getComponent(Transform2D.class);
        if(transform == null) return;
        if(type == CollisionType.MOVABLE) {
            var otherBoxes = system.getGame().getEntities().stream().filter(e -> e != this.entity && e.hasComponent(CollisionBox2D.class)).map(e -> e.getComponent(CollisionBox2D.class)).toList();
            for(var box : otherBoxes) {
                if(box != null && box.type != CollisionType.PASS_THROUGH && box.type != CollisionType.DO_NOT_AVOID && overlaps(box)) {
                    while(overlaps(box)) transform.rollback();
                }
            }
        }
    }

    public boolean hasCollision() {
        if(system == null) return false;
        var otherBoxes = system.getGame().getEntities().stream().filter(e -> e != this.entity && e.hasComponent(CollisionBox2D.class)).map(e -> e.getComponent(CollisionBox2D.class)).toList();
        for(var box : otherBoxes) {
            if(box != null && box.type != CollisionType.PASS_THROUGH && overlaps(box)) {
                return true;
            }
        }
        return false;
    }

    public boolean overlapsPoint(Vec2 point) {
        var transform = getComponent(Transform2D.class);
        if(transform == null) return false;
        return (transform.getX() < point.x()) && (point.x() < transform.getX() + this.width) && (transform.getY() < point.y()) && (point.y() < transform.getY() + this.height);
    }

    public boolean overlaps(CollisionBox2D otherBox) {
        var thisTransform = getComponent(Transform2D.class);
        var otherTransform = otherBox.getComponent(Transform2D.class);
        if(thisTransform == null || otherTransform == null) return false;
        if(otherBox == this) return false;

        // see https://gamedev.stackexchange.com/a/169234 and https://silentmatt.com/rectangle-intersection/

        return thisTransform.getX() < (otherTransform.getX() + otherBox.width)
            && (thisTransform.getX() + this.width) > otherTransform.getX()
            && thisTransform.getY() < (otherTransform.getY() + otherBox.height)
            && (thisTransform.getY() + this.height) > otherTransform.getY(); // no collision
    }
}