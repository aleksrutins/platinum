package platinum.twod;

import platinum.ecs.Component;
import platinum.ecs.System;
import platinum.math.Vec2;

import java.util.ArrayList;
import java.util.List;

public class Transform2D extends Component<RenderSystem2D> {
    public float xMod = 0;
    public float yMod = 0;
    public Vec2 delta = new Vec2(0, 0);
    private float x;
    private float y;

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

    public float getX() {
        return x;
    }

    public int getXi() {
        return Math.round(x);
    }

    public float getY() {
        return y;
    }

    public int getYi() {
        return Math.round(y);
    }

    public float getActX() {
        return x + xMod;
    }
    public int getActXi() {
        return Math.round(getActX());
    }
    public float getActY() {
        return y + yMod;
    }
    public int getActYi() {
        return Math.round(getActY());
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