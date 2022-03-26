import * as platinum from '../mod.ts';

class Player extends platinum.ecs.Entity {
    constructor(private camera: platinum.s2d.CameraEntity2D, transform: platinum.s2d.Transform2D) {
        super("player");
        this.attach(transform);
        this.attach(new platinum.s2d.CollisionBox2D(platinum.s2d.CollisionType.Movable, 24, 24));
        platinum.image.loadBitmap('sprite.png').then(bmp => {
            this.attach(new platinum.s2d.Sprite2D(bmp, 0.75));
        });
    }

    update(systems: platinum.ecs.System[]) {
        const transform = this.getComponent(platinum.s2d.Transform2D)!;
        if(keyboard.isDown('ArrowDown')) {
            transform.translate([0, 4]);
        } else if(keyboard.isDown('ArrowUp')) {
            transform.translate([0, -4]);
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

game.use(new platinum.s2d.RenderSystem2D(document.querySelector('#game')!));

let keyboard = game.useExt(platinum.input.keyboard.KeyboardManager);

let camera = new platinum.s2d.CameraEntity2D("camera", 640, 480);

const level: platinum.s2d.level.Level = {
    name: "main",
    tiles: [
        {
            index: 0,
            x: 50,
            y: 50,
            collisionType: 'Solid'
        },
        {
            index: 1,
            x: 50 + 32,
            y: 50,
            collisionType: 'Solid'
        },
        {
            index: 0,
            x: 50 + 64,
            y: 50 + 64,
            collisionType: 'Solid'
        }
    ],
    entities: [
        {
            name: 'player',
            x: 0,
            y: 0
        }
    ]
}

const tilemap = await platinum.image.load('tilemap.png');

game.addAll(await platinum.s2d.level.LevelLoader.load(level, {
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

game.getSystem(platinum.s2d.RenderSystem2D)!.clearColor = 'yellow';

game.mainLoop(() => {
    
});