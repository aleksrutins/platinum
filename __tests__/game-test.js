import { Game, Entity } from "..";
/** @type {Game} */
let game;

class MockEntity extends Entity {
}

beforeEach(() => {
    game = new Game;
});

test("successfully adds entities", () => {
    game.add(new MockEntity("hi"));
    expect(game.get(MockEntity, "hi")).toBeInstanceOf(MockEntity);
});

test("successfully removes entities", () => {
    let e = new MockEntity("hi");
    game.add(e);
    expect(game.get(MockEntity, "hi")).toBeInstanceOf(MockEntity);
    game.remove(e);
    expect(game.get(MockEntity, "hi")).toBeFalsy();
})