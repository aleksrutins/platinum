import { Component, System } from "../ecs.ts";
import { CollisionBox2D } from "./CollisionBox2D.ts";
import { RenderSystem2D } from "./RenderSystem2D.ts";
import { Transform2D } from "./Transform2D.ts";

/** 
 * A component for a platformer physics system.
 * Requires:
 * - Transform2D
 * - CollisionBox2D (preferably using `CollisionType.DoNotAvoid` for everything)
 */
export class PlatformerPhysics2D extends Component<RenderSystem2D> {
    /**
     * Gravity.
     */
    fallSpeed = .05;
    /** What acceleration to use when jumping. */
    jumpSpeed = 3;
    canUse(system: System): system is RenderSystem2D {
        return system instanceof RenderSystem2D;
    }
    init(system: RenderSystem2D): void {
        
    }

    update(system: RenderSystem2D): void {
        let collisionBox = this.getComponent(CollisionBox2D);
        let transform = this.getComponent(Transform2D);
        if(!(collisionBox && transform)) {
            console.warn("PlatformerPhysics2D used without CollisionBox2D and Transform2D");
            return;
        }

        if(!collisionBox.hasCollision()) {
            transform.delta[1] += this.fallSpeed;
        } else {
            transform.delta[1] = 0;
        }
    }

    /**
     * Jump.
     */
    jump(): void {
        let transform = this.getComponent(Transform2D);
        if(!transform) {
            console.warn("PlatformerPhysics2D used without Transform2D");
            return;
        }
        transform.delta[1] -= this.jumpSpeed;
        transform.update(null!);
    }
}