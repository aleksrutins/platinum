package platinum.example;
import platinum.Game;
import platinum.ecs.Entity;
import platinum.input.KeyboardManager;
import platinum.math.Vec2;
import platinum.twod.CameraEntity2D;
import platinum.twod.RenderSystem2D;
import platinum.twod.Sprite2D;
import platinum.twod.Transform2D;
import platinum.twod.collision.CollisionType;
import platinum.twod.level.*;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.io.IOException;
import java.net.URL;

public class Main {
  public static void main(String[] args) throws Exception {
    var game = new Game();
    var wnd = new JFrame("Platinum Example");
    wnd.setPreferredSize(new Dimension(640, 480));
    var kbd = new KeyboardManager(wnd);
    var img = ImageIO.read(Main.class.getResource("/platinum/example/player.png"));

    var tilemapImg = ImageIO.read(Main.class.getResource("/platinum/example/tilemap.png"));
    var tiles = LevelLoader.load(new Level("main", new TileInfo[]{
            new TileInfo(0, 15, 15, CollisionType.PASS_THROUGH),
            new TileInfo(1, 57, 57, CollisionType.PASS_THROUGH),
            new TileInfo(1, 98, 73, CollisionType.PASS_THROUGH)
    }, new LevelEntity[] {
            new LevelEntity("player", 25, 25)
    }), new TilemapInfo(
            tilemapImg,
            5,1,
            32, 32
    ), (name, transform) -> {
        return switch(name) {
            case "player" -> {
                var player = new Entity("player");
                player.attach(transform);
                player.attach(new Sprite2D(img));
                yield player;
            }
            default -> null;
        };
    });

    var renderer = new RenderSystem2D();
    var camera = new CameraEntity2D("camera", 640, 480);
    game.use(renderer);
    game.addAll(tiles);
    game.add(camera);
    wnd.add(renderer);
    wnd.pack();
    wnd.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    wnd.setResizable(false);
    wnd.setVisible(true);

    game.mainLoop(_game -> {
        var entity = game.get(Entity.class, "player").orElseThrow();
        var transform = entity.getComponent(Transform2D.class);
      if(kbd.isDown(KeyEvent.VK_RIGHT) || kbd.isDown(KeyEvent.VK_D)) {
        transform.translate(new Vec2(5, 0));
      } else if(kbd.isDown(KeyEvent.VK_LEFT) || kbd.isDown(KeyEvent.VK_A)) {
        transform.translate(new Vec2(-5, 0));
      }
      if(kbd.isDown(KeyEvent.VK_UP) || kbd.isDown(KeyEvent.VK_W)) {
        transform.translate(new Vec2(0, -5));
      } else if(kbd.isDown(KeyEvent.VK_DOWN) || kbd.isDown(KeyEvent.VK_S)) {
        transform.translate(new Vec2(0, 5));
      }
      camera.follow(transform, 0.1f);
      return true;
    });
  }
}