import { Component, System } from "../ecs.ts";
import { RenderSystem2D } from "./RenderSystem2D.ts";

export class Transform2D extends Component<RenderSystem2D> {
  constructor(public x: number, public y: number) {
    super();
  }
  canUse(system: System): system is RenderSystem2D {
    return system instanceof RenderSystem2D;
  }
  init(system: RenderSystem2D): void {
  }
  update(system: RenderSystem2D): void {
  }
}
