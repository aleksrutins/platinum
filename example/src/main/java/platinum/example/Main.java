package platinum.example;
import platinum.Game;
import platinum.ecs.Entity;
import platinum.twod.RenderSystem2D;
import platinum.twod.Sprite2D;
import platinum.twod.Transform2D;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public class Main {
  public static void main(String[] args) throws IOException {
    var game = new Game();
    var wnd = new JFrame("Platinum Example");
    wnd.setPreferredSize(new Dimension(640, 480));
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
    wnd.setVisible(true);
    game.mainLoop(_game -> true);
  }
}