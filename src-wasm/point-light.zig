fn clamp(x: f64, min: f64, max: f64) f64 {
    if(x < min) return min;
    if(x > max) return max;
    return x;
}
fn parabola(x: f64, max: u32, radius: u32) f64 {
    const a = @divExact(-@as(i64, radius*radius), max);
    const result = @intToFloat(f64, a)*x*x + @intToFloat(f64, max);
    return clamp(result, 0, 255);
}

fn calculate(x: u32, y: u32, radius: u32, brightness: u32, cx: u32, cy: u32) f64 {
    const dist = @sqrt((@intToFloat(f32, x - cx)*@intToFloat(f32, x - cx)) + (@intToFloat(f32, y - cy)*@intToFloat(f32, x - cx)));
    return parabola(dist, brightness, radius);
}

export fn calculateAll(buf: [*]u8, width: usize, height: usize, cx: u32, cy: u32, radius: u32, brightness: u32) void {
    const buflen = width * height;
    for (buf[0..buflen]) |value, i| {
        if(i % 4 != 0) continue;

        const x = (i / 4) % width;
        const y = (i / 4) / width;
        buf[i] = value + @floatToInt(u8, calculate(x, y, radius, brightness, cx, cy));
    }
}