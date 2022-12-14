package platinum.example;
import platinum.Game;
import platinum.twod.RenderSystem2D;

import javax.swing.*;

public class Main {
  public static void main(String[] args) {
    var game = new Game();
    var wnd = new JFrame("Platinum Example");
    var renderer = new RenderSystem2D();
    game.use(renderer);
    wnd.add(renderer);
    wnd.pack();
    wnd.setVisible(true);
    game.mainLoop(_game -> true);
  }
}