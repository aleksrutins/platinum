package platinum.twod.level

import platinum.ecs.Entity
import platinum.twod.Sprite2D
import platinum.twod.Transform2D
import platinum.twod.collision.CollisionBox2D
import java.util.function.BiFunction

object LevelLoader {
    @Throws(Exception::class)
    fun load(level: Level, tilemap: TilemapInfo, entityCallback: (String, Transform2D) -> Entity?): Collection<Entity> {
        val entities: MutableList<Entity> = ArrayList()
        for (tile in level.tiles) {
            val tileCol = tile.index % tilemap.cols
            val tileRow = if (tile.index > 0) Math.floorDiv(tile.index, tilemap.cols) else 0
            if (tileRow >= tilemap.rows) throw Exception("Tile index out of bounds")
            val image = tilemap.image.getSubimage(tileCol * tilemap.tileWidth, tileRow * tilemap.tileHeight, tilemap.tileWidth, tilemap.tileHeight)
            val entity = Entity(String.format("level_%s_%f_%f", level.name, tile.x, tile.y))
            val sprite = Sprite2D(image)
            entity.attach(Transform2D(tile.x, tile.y))
            entity.attach(sprite)
            entity.attach(CollisionBox2D(tile.collisionType))
            entities.add(entity)
        }
        for (entity in level.entities) {
            val actEntity = entityCallback(entity.name, Transform2D(entity.x, entity.y))
            if (actEntity != null) entities.add(actEntity)
        }
        return entities
    }
}