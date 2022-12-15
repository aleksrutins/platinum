package platinum.ecs;

import java.util.HashMap;

import platinum.Game;

public interface System {
    static HashMap<System, Game> gamesMap = new HashMap<>();
    default Game getGame() {
        return gamesMap.get(this);
    }
    void init(Game game);
    void update();
}
