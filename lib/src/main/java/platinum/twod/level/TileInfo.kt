package platinum.twod.level;

import platinum.twod.collision.CollisionType;

public record TileInfo(
    int index,
    float x,
    float y,
    CollisionType collisionType
) {}