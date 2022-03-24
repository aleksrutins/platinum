import * as platinum from '../mod.ts';

let game = new platinum.Game;

let keyboard = game.useExt(platinum.input.keyboard.KeyboardManager);

game.use(new platinum.s2d.RenderSystem2D(document.querySelector("#game")!));
let player = new platinum.ecs.Entity("player");
player.attach(new platinum.s2d.Transform2D(10, 10));

let img = new Image();
img.addEventListener('load', async () => player.attach(new platinum.s2d.Sprite2D(await createImageBitmap(img))));
img.src = "sprite.png";

game.add(player);

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
});