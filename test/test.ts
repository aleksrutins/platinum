import * as platinum from 'platinum';
import tilemapURL from './tilemap.png';
import spriteURL from './sprite.png';
import { CollisionBox2D, PlatformerPhysics2D, Transform2D } from 'platinum';

(async () => {
class Player extends platinum.Entity {
    constructor(private camera: platinum.CameraEntity2D, transform: Transform2D) {
        super("player");
        this.attach(new PlatformerPhysics2D());
        this.attach(transform);
        this.attach(new platinum.CollisionBox2D(platinum.CollisionType.DoNotAvoid, 24, 24));
        platinum.image.loadBitmap(spriteURL).then(bmp => {
            this.attach(new platinum.Sprite2D(bmp, 0.75));
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

game.use(new platinum.RenderSystem2D(document.querySelector('#game')!));

let keyboard = game.useExt(platinum.input.keyboard.KeyboardManager);

let camera = new platinum.CameraEntity2D("camera", 640, 480);

const level: platinum.level.Level = {
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

const tilemap = await platinum.image.load(tilemapURL);

const light = new platinum.effects.PointLight2D(0, 0, 640, 480);

game.addAll(await platinum.level.LevelLoader.load(level, {
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

game.getSystem(platinum.RenderSystem2D)!.clearColor = 'yellow';
//game.getSystem(platinum.s2d.RenderSystem2D)!.addEffect(new platinum.s2d.effects.Darkness(640, 480));
//game.getSystem(platinum.s2d.RenderSystem2D)!.addEffect(light);

game.mainLoop(() => {
    light.cx = game.get(Player, 'player')!.getComponent(Transform2D)!.actX + game.get(Player, 'player')!.getComponent(platinum.CollisionBox2D)!.width/2;
    light.cy = game.get(Player, 'player')!.getComponent(Transform2D)!.actY + game.get(Player, 'player')!.getComponent(platinum.CollisionBox2D)!.height/2;
    return true;
});
})();