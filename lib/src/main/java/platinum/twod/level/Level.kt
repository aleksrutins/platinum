package platinum.twod.level

class Level(name: String, tiles: Array<TileInfo>, entities: Array<LevelEntity>) {
    val name: String
    val tiles: Array<TileInfo>
    val entities: Array<LevelEntity>

    init {
        this.name = name
        this.tiles = tiles
        this.entities = entities
    }
}