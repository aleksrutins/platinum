#include <math.h>
typedef char byte;

float parabola(float x, int max, int radius) {
    float a = (radius*radius) / max;
    return a * (x*x) + max;
}

float calculate(int x, int y, int radius, int brightness, int cx, int cy) {
    float dist = sqrt(pow(x - cx, 2) + pow(y - cy, 2));
    return parabola(dist, brightness, radius);
}

void calculateAll(byte *buf, int width, int height, int cx, int cy, int radius, int brightness) {
    int len = width * height;
    for(register int i = 0; i < len; i += 4) {
        int x = (i / 4) % width;
        int y = (i / 4) / width;
        buf[i] += calculate(x, y, radius, brightness, cx, cy);
    }
}