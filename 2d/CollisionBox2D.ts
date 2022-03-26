import { Component, System } from '../ecs.ts';
import { RenderSystem2D } from './RenderSystem2D.ts';
import { Transform2D } from "./Transform2D.ts";
import { Sprite2D } from "./Sprite2D.ts";
import { Vec2 } from "../math/vectors.ts";

/**
 * The behavior to use when colliding.
 */
export enum CollisionType {
    /**
     * This object cannot be moved, but prevents other objects from moving through it.
     */
    Solid,
    /**
     * This object can be moved.
     */
    Movable,
    /**
     * This object cannot be moved and does not affect other objects.
     */
    PassThrough,
}

/**
 * A component to handle collisions between entities.
 * Requires Transform2D.
 */
export class CollisionBox2D extends Component<RenderSystem2D> {
    /**
     * Creates a new CollisionBox2D. If, on initialization, this entity also has a `Sprite2D` and `width` and `height` are not specified, then this will use the dimensions from the Sprite2D's image.
     * @param type How to handle collisions.
     * @param width The width of the collision box.
     * @param height The height of the collision box.
     */
    constructor(public type: CollisionType, public width = 0, public height = 0) {
        super();
    }
    canUse(system: System): system is RenderSystem2D {
        return system instanceof RenderSystem2D;
    }
    init(_system: RenderSystem2D): void {
        const sprite = this.getComponent(Sprite2D)
        if(sprite && this.width == 0 && this.height == 0) {
            this.width = sprite.img.width * sprite.scale;
            this.height = sprite.img.height * sprite.scale;
        }
    }
    update(system: RenderSystem2D): void {
        const transform = this.getComponent(Transform2D);
        if(transform == null) return;
        if(this.type == CollisionType.Movable) {
            const otherBoxes = system.game!.getWhere(e => e != this.entity && e.hasComponent(CollisionBox2D)).map(e => e.getComponent(CollisionBox2D));
            for(const box of otherBoxes) {
                if(box && box?.type != CollisionType.PassThrough && this.overlaps(box)) {
                    while(this.overlaps(box)) transform.rollback();
                }
            }
        }
    }

    /**
     * Detects whether or not (x, y) is within the area defined by `this`.
     * @param x The X coordinate of the point to check.
     * @param y The Y coordinate of the point to check.
     * @returns Whether or not (x, y) is inside the area defined by `this`.
     */
    overlapsPoint(x: number, y: number): boolean {
        const transform = this.getComponent(Transform2D);
        if(transform == null) return false;
        return (transform.x < x) && (x < transform.x + this.width) && (transform.y < y) && (y < transform.y + this.height);
    }

    /**
     * Detects whether or not `this` and `otherBox` overlap.
     * @param otherBox The other CollisionBox2D.
     * @returns Whether or not `this` and `otherBox` overlap.
     */
    overlaps(otherBox: CollisionBox2D): boolean {
        const thisTransform = this.getComponent(Transform2D);
        const otherTransform = otherBox.getComponent(Transform2D);
        if(!thisTransform || !otherTransform) return false;
        if(otherBox == this) return false;

        // see https://gamedev.stackexchange.com/a/169234 and https://silentmatt.com/rectangle-intersection/

        if(!(  thisTransform.x < (otherTransform.x + otherBox.width)
            && (thisTransform.x + this.width) > otherTransform.x
            && thisTransform.y < (otherTransform.y + otherBox.height)
            && (thisTransform.y + this.height) > otherTransform.y
            )) return false; // no collision
        
        return true;
    }
}