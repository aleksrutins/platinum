package platinum.twod;

import platinum.ecs.Component;
import platinum.ecs.System;
import platinum.math.Vec2;

import java.util.ArrayList;
import java.util.List;

public class Transform2D extends Component<RenderSystem2D> {
    public int xMod = 0;
    public int yMod = 0;
    public Vec2 delta = new Vec2(0, 0);
    private int x;
    private int y;

    public Vec2 getPosition() {
        return new Vec2(x, y);
    }
    public void setPosition(Vec2 newPos) {
        history.add(getPosition());
        while(history.size() > 20) history.remove(0);
        x = newPos.x();
        y = newPos.y();
    }
    private final List<Vec2> history = new ArrayList<>();
    public Transform2D(int x, int y) {
        this.x = x;
        this.y = y;
    }
    public void translate(Vec2 vec) {
        setPosition(Vec2.add(getPosition(), vec));
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getActX() {
        return x + xMod;
    }
    public int getActY() {
        return y + yMod;
    }

    public void rollback() {
        var last = history.remove(history.size() - 1);
        if(last == null) last = getPosition();
        x = last.x();
        y = last.y();
    }


    @Override
    public void init(System system) { }

    @Override
    public void update(System system) {

    }
}