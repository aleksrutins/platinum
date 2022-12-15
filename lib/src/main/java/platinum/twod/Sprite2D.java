package platinum.twod;

import platinum.ecs.Component;
import platinum.ecs.System;

import java.awt.*;
import java.awt.image.BufferedImage;

public class Sprite2D extends Component<RenderSystem2D> {
    BufferedImage img;

    public Sprite2D(BufferedImage img) {
        this.img = img;
    }

    @Override
    public void init(System system) {
    }

    @Override
    public void update(System system) {
        Transform2D transform = getComponent(Transform2D.class);
        ((RenderSystem2D)system).graphics2D.drawImage(img, transform.getActXi(), transform.getActYi(), img.getWidth(), img.getHeight(), new Color(0, 0, 0, 0), null);
    }
}