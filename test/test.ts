import * as platinum from '@platinum-ge/core';
import * as image from "@platinum-ge/image";
import tilemapURL from './tilemap.png';
import spriteURL from './sprite.png';
import { CameraEntity2D, CollisionBox2D, CollisionType, PlatformerPhysics2D, Sprite2D, Transform2D, effects, RenderSystem2D, level } from '@platinum-ge/2d';

(async () => {
class Player extends platinum.Entity {
    constructor(private camera: CameraEntity2D, transform: Transform2D) {
        super("player");
        this.attach(new PlatformerPhysics2D());
        this.attach(transform);
        this.attach(new CollisionBox2D(CollisionType.DoNotAvoid, 24, 24));
        image.loadBitmap(spriteURL).then(bmp => {
            this.attach(new Sprite2D(bmp, 0.75));
        });
    }

    update(systems: platinum.System[]) {
        const transform = this.getComponent(Transform2D)!;
        const collision = this.getComponent(CollisionBox2D)!;
        const platformer = this.getComponent(PlatformerPhysics2D)!;
        if(keyboard.isDown('ArrowUp') && collision.hasCollision()) {
            platformer.jump();
        }
        if(keyboard.isDown('ArrowLeft')) {
            transform.translate([-4, 0]);
        } else if(keyboard.isDown('ArrowRight')) {
            transform.translate([4, 0]);
        }
        this.camera.follow(transform);
        super.update(systems);
    }
}

let game = new platinum.Game;
const light = new effects.PointLight2D(0, 0, 640, 480);
let system = new RenderSystem2D(document.querySelector('#game')!);
system.addEffect(new effects.Darkness(640, 480));
system.addEffect(light);

game.use(system);

let keyboard = game.useExt(platinum.input.keyboard.KeyboardManager);

let camera = new CameraEntity2D("camera", 640, 480);

const _level: level.Level = {
    name: "main",
    tiles: [
        {
            index: 0,
            x: 50,
            y: 50,
            collisionType: 'DoNotAvoid'
        },
        {
            index: 1,
            x: 50 + 32,
            y: 50,
            collisionType: 'DoNotAvoid'
        },
        {
            index: 0,
            x: 50 + 64,
            y: 50 + 64,
            collisionType: 'DoNotAvoid'
        }
    ],
    entities: [
        {
            name: 'player',
            x: 50,
            y: 0
        }
    ]
}

const tilemap = await image.load(tilemapURL);

game.addAll(await level.LevelLoader.load(_level, {
    image: tilemap,
    tileHeight: 32,
    tileWidth: 32,
    rows: 2,
    cols: 1,
}, (name, pos) => {
    switch(name) {
        case 'player':
            return new Player(camera, pos);
    }
}))

game.add(camera);

game.getSystem(RenderSystem2D)!.clearColor = 'yellow';

game.mainLoop(() => {
    light.cx = game.get(Player, 'player')!.getComponent(Transform2D)!.actX + game.get(Player, 'player')!.getComponent(CollisionBox2D)!.width/2;
    light.cy = game.get(Player, 'player')!.getComponent(Transform2D)!.actY + game.get(Player, 'player')!.getComponent(CollisionBox2D)!.height/2;
    return true;
});
})();