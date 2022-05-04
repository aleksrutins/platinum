use std::convert::TryInto;
use wasm_bindgen::prelude::*;

fn parabola(x: i32, max: i32, radius: i32) -> u8 {
    let a = -(radius * radius * x * x) / max;
    let result = a*x + max;
    return if result <= 0 { 0 } else { result.try_into().or::<u8>(Ok(255)).unwrap() };
}

fn calculate(x: i32, y: i32, radius: i32, brightness: u8, cx: i32, cy: i32) -> u8 {
    let dist = f32::sqrt((i32::pow(x - cx, 2) + i32::pow(y - cy, 2)) as f32) as i32;
    return parabola(dist, brightness.into(), radius);
}

#[wasm_bindgen]
pub fn calculate_all(buf: &mut [u8], width: usize, height: usize, cx: i32, cy: i32, radius: i32, brightness: u8) {
    let buflen = width * height;
    let mut i: usize = 0;
    loop {
        let x = (i / 4) % width;
        let y = (i / 4) / width;
        
        buf[i] += calculate(x.try_into().unwrap(), y.try_into().unwrap(), radius, brightness, cx, cy);

        i += 4;
        if i > buflen { break; }
    }
}