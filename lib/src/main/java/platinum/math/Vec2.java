package platinum.math;

public record Vec2(int x, int y) {
    public static Vec2 add(Vec2 a, Vec2 b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
}