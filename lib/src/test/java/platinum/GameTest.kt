package platinum;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import platinum.ecs.Entity;

public class GameTest {
  @Test
  void canAddEntities() {
      var game = new Game();
      var entity = new Entity("helloWorld");
      game.add(entity);
      assertTrue(game.get(Entity.class, "helloWorld").isPresent());
  }
}