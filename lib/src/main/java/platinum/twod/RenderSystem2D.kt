package platinum.twod;

import platinum.Game;
import platinum.ecs.System;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.Collection;

public class RenderSystem2D extends JComponent implements System {
    private Game game;

    public Color clearColor = Color.BLACK;

    public Graphics2D graphics2D;

    private Collection<PostRenderEffect> effects = new ArrayList<>();

    public void addEffect(PostRenderEffect effect) {
        effects.add(effect);
    }

    @Override
    public void paint(Graphics g) {
        var g2d = (Graphics2D)g;
        graphics2D = g2d;
        var bounds = g2d.getDeviceConfiguration().getBounds();
        g2d.setBackground(clearColor);
        g2d.clearRect(0, 0, bounds.width, bounds.height);
        game.getEntities().forEach(entity -> entity.update(this));
        effects.forEach(e -> e.update(this));
    }

    @Override
    public void init(Game game) {
        this.game = game;
        effects.forEach(e -> e.init(this));
    }

    @Override
    public void update() {
        repaint();
    }
}