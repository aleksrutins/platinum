package platinum.twod.level;

import java.awt.image.BufferedImage;

public record TilemapInfo(
    BufferedImage image,
    int rows,
    int cols,
    int tileWidth,
    int tileHeight
) {}