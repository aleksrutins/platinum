import { Component, System } from '../ecs.ts';
import { RenderSystem2D } from './RenderSystem2D.ts';
import { Transform2D } from "./Transform2D.ts";
import { Sprite2D } from "./Sprite2D.ts";
import { Vec2 } from "../math/vectors.ts";

export enum CollisionType {
    Solid,
    Movable,
    PassThrough,
}

export enum OverlapDirection {
    Left,
    Right,
    Top,
    Bottom,
    None,
}

export class CollisionBox2D extends Component<RenderSystem2D> {
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
            const otherBoxes = system.game!.getWhere(e => e != this.entity && e.getComponent(CollisionBox2D) != null).map(e => e.getComponent(CollisionBox2D));
            for(const box of otherBoxes) {
                if(box && box?.type != CollisionType.PassThrough && !isNaN(this.overlaps(box)[0]) && !isNaN(this.overlaps(box)[1])) {
                    const [xOverlap, yOverlap] = this.overlaps(box);
                    console.log(xOverlap, yOverlap);
                    if(xOverlap < yOverlap && xOverlap != 0) {
                        transform.x += xOverlap;
                    } else {
                        transform.y += yOverlap;
                    }
                }
            }
        }
    }
    overlapsPoint(x: number, y: number): boolean {
        const transform = this.getComponent(Transform2D);
        if(transform == null) return false;
        return (transform.x < x) && (x < transform.x + this.width) && (transform.y < y) && (y < transform.y + this.height);
    }

    overlaps(otherBox: CollisionBox2D): Vec2 {
        const thisTransform = this.getComponent(Transform2D);
        const otherTransform = otherBox.getComponent(Transform2D);
        if(!thisTransform || !otherTransform) return [NaN, NaN];
        if(otherBox == this) return [NaN, NaN];

        // see https://gamedev.stackexchange.com/a/169234 and https://silentmatt.com/rectangle-intersection/

        if(!(  thisTransform.x < (otherTransform.x + otherBox.width)
            && (thisTransform.x + this.width) > otherTransform.x
            && thisTransform.y < (otherTransform.y + otherBox.height)
            && (thisTransform.y + this.height) > otherTransform.y
            )) return [NaN, NaN]; // no collision
        
        if(this.overlapsPoint(otherTransform.x, otherTransform.y)) {
            return [
                otherTransform.x - (thisTransform.x + this.width),
                otherTransform.y - (thisTransform.y + this.height)
            ]
        }
        if(this.overlapsPoint(otherTransform.x + otherBox.width, otherTransform.y + otherBox.height)) {
            return [
                (otherTransform.x + otherBox.width) - thisTransform.x,
                (otherTransform.y + otherBox.height) - thisTransform.y
            ]
        }
        if(this.overlapsPoint(otherTransform.x + otherBox.width, otherTransform.y)) {
            return [
                (otherTransform.x + otherBox.width) - thisTransform.x,
                otherTransform.y - (thisTransform.y + this.height)
            ]
        }
        if(this.overlapsPoint(otherTransform.x, otherTransform.y + otherBox.height)) {
            return [
                otherTransform.x - (thisTransform.x + this.width),
                (otherTransform.y + otherBox.height) - thisTransform.y
            ]
        }
        return [NaN, NaN];
    }
}