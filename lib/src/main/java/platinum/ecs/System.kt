package platinum.ecs

import platinum.Game

interface System {
    val game: Game?
        get() = gamesMap[this]

    fun init(game: Game?)
    fun update()

    companion object {
        val gamesMap = HashMap<System, Game>()
    }
}