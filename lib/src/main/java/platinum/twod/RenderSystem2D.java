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

    private Collection<PostRenderEffect> effects = new ArrayList<>();

    public void addEffect(PostRenderEffect effect) {
        effects.add(effect);
    }

    @Override
    public void paint(Graphics g) {
        var g2d = (Graphics2D)g;
        var bounds = g2d.getDeviceConfiguration().getBounds();
        g2d.setBackground(clearColor);
        g2d.clearRect(0, 0, bounds.width, bounds.height);
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

    @Override
    public void postUpdate() {
        effects.forEach(e -> e.update(this));
    }
}