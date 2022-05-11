import { Game, Entity } from "..";
let game;

class MockEntity extends Entity {
}

beforeAll(() => {
    game = new Game;
});
test("successfully adds entities", () => {
    game.add(new MockEntity("hi"));
    expect(game.get(MockEntity, "hi")).toBeInstanceOf(MockEntity);
});