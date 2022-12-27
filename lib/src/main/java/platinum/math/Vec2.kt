package platinum.math;

public record Vec2(float x, float y) {
    public static Vec2 add(Vec2 a, Vec2 b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    public static Vec2 lerp(Vec2 a, Vec2 b, float t) {
        return new Vec2(Util.lerp(a.x, b.x, t), Util.lerp(a.y, b.y, t));
    }
}