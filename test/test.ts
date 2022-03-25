import * as platinum from '../mod.ts';

let game = new platinum.Game;

let keyboard = game.useExt(platinum.input.keyboard.KeyboardManager);

game.use(new platinum.s2d.RenderSystem2D(document.querySelector("#game")!));
let player = new platinum.ecs.Entity("player");
player.attach(new platinum.s2d.Transform2D(10, 10));
player.attach(new platinum.s2d.CollisionBox2D(platinum.s2d.CollisionType.Movable, 32, 32));

let box = new platinum.ecs.Entity("box");
box.attach(new platinum.s2d.Transform2D(200, 200));
box.attach(new platinum.s2d.CollisionBox2D(platinum.s2d.CollisionType.Solid, 32, 32));

let img = new Image();
img.addEventListener('load', async () => player.attach(new platinum.s2d.Sprite2D(await createImageBitmap(img))));
img.src = "sprite.png";

let img2 = new Image();
img2.addEventListener('load', async () => box.attach(new platinum.s2d.Sprite2D(await createImageBitmap(img2))));
img2.src = "thingy.png";

let camera = new platinum.s2d.CameraEntity2D("camera", 640, 480);

game.add(player);
game.add(box);
game.add(camera);

game.getSystem(platinum.s2d.RenderSystem2D)!.clearColor = 'yellow';

game.mainLoop(() => {
    const transform = player.getComponent(platinum.s2d.Transform2D)!;
    if(keyboard.isDown('ArrowDown')) {
        transform.y += 4;
    } else if(keyboard.isDown('ArrowUp')) {
        transform.y -= 4;
    }
    if(keyboard.isDown('ArrowLeft')) {
        transform.x -= 4;
    } else if(keyboard.isDown('ArrowRight')) {
        transform.x += 4;
    }
    camera.follow(transform);
});