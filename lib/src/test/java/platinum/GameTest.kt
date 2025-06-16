package platinum

import org.junit.jupiter.api.Test
import platinum.ecs.Entity

class GameTest {
    @Test
    fun canAddEntities() {
        val game = Game()
        val entity = Entity("helloWorld")
        game.add(entity)
        assert(game.get<Entity>("helloWorld") != null)
    }
}