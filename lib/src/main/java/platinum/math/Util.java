package platinum.math;

public class Util {
    public static float lerp(float a, float b, float t) {
        return a + t * (b - a);
    }
}
