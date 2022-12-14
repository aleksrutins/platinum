package platinum.ecs;

import platinum.Game;

public interface System {
    void init(Game game);
    void update();
}
