package platinum.example;
import platinum.Game;
import platinum.ecs.Entity;
import platinum.input.KeyboardManager;
import platinum.math.Vec2;
import platinum.twod.RenderSystem2D;
import platinum.twod.Sprite2D;
import platinum.twod.Transform2D;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.io.IOException;
import java.net.URL;

public class Main {
  public static void main(String[] args) throws IOException {
    var game = new Game();
    var wnd = new JFrame("Platinum Example");
    wnd.setPreferredSize(new Dimension(640, 480));
    var kbd = new KeyboardManager(wnd);
    var img = ImageIO.read(new URL("https://dontlookback.vercel.app/player.cf056a06.png"));
    var renderer = new RenderSystem2D();
    var sprite = new Sprite2D(img);
    var entity = new Entity("player");
    entity.attach(new Transform2D(15, 15));
    entity.attach(sprite);
    game.use(renderer);
    game.add(entity);
    wnd.add(renderer);
    wnd.pack();
    wnd.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    wnd.setVisible(true);

    game.mainLoop(_game -> {
      var transform = entity.getComponent(Transform2D.class);
      if(kbd.isDown(KeyEvent.VK_RIGHT)) {
        transform.translate(new Vec2(5, 0));
      } else if(kbd.isDown(KeyEvent.VK_LEFT)) {
        transform.translate(new Vec2(-5, 0));
      }
      if(kbd.isDown(KeyEvent.VK_UP)) {
        transform.translate(new Vec2(0, -5));
      } else if(kbd.isDown(KeyEvent.VK_DOWN)) {
        transform.translate(new Vec2(0, 5));
      }
      return true;
    });
  }
}