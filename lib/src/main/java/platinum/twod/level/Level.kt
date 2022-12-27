package platinum.twod.level;

public record Level(
    String name,
    TileInfo[] tiles,
    LevelEntity[] entities
) {}