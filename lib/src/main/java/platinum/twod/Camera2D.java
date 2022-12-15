package platinum.twod;

import platinum.ecs.Component;
import platinum.ecs.System;

public class Camera2D extends Component<RenderSystem2D> {

    @Override
    public void init(System system) {
        
    }

    @Override
    public void update(System system) {
        if(!hasComponent(Transform2D.class)) return;
        for(Transform2D transform : system.getGame().getEntities().stream()
                                    .filter(e -> e.hasComponent(Transform2D.class))
                                    .map(e -> e.getComponent(Transform2D.class))
                                    .toList()) {
            transform.xMod = 0 - getComponent(Transform2D.class).getX();
            transform.yMod = 0 - getComponent(Transform2D.class).getY();
        }
    }
    
}
