package platinum.twod.level;

import platinum.ecs.Entity;
import platinum.twod.Sprite2D;
import platinum.twod.Transform2D;
import platinum.twod.collision.CollisionBox2D;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.BiFunction;

public class LevelLoader {
  public static Collection<Entity> load(Level level, TilemapInfo tilemap, BiFunction<String, Transform2D, Entity> entityCallback) throws Exception {
      List<Entity> entities = new ArrayList<>();
      for(var tile : level.tiles()) {
          int tileCol = tile.index() % tilemap.cols();
          int tileRow = (tile.index() > 0? Math.floorDiv(tile.index(), tilemap.cols()) : 0);
          if(tileRow >= tilemap.rows()) throw new Exception("Tile index out of bounds");
          var image = tilemap.image().getSubimage(tileCol * tilemap.tileWidth(), tileRow * tilemap.tileHeight(), tilemap.tileWidth(), tilemap.tileHeight());
          var entity = new Entity(String.format("level_%s_%f_%f", level.name(), tile.x(), tile.y()));
          var sprite = new Sprite2D(image);
          entity.attach(new Transform2D(tile.x(), tile.y()));
          entity.attach(sprite);
          entity.attach(new CollisionBox2D(tile.collisionType()));
          entities.add(entity);
      }
      for(var entity : level.entities()) {
          var actEntity = entityCallback.apply(entity.name(), new Transform2D(entity.x(), entity.y()));
          if(actEntity != null) entities.add(actEntity);
      }
      return entities;
  }
}