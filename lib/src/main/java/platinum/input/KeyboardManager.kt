package platinum.input

import java.awt.Component
import java.awt.event.KeyEvent
import java.awt.event.KeyListener

class KeyboardManager(thingy: Component) {
    private val keys: MutableSet<Int> = HashSet()

    init {
        thingy.addKeyListener(Listener())
    }

    private inner class Listener : KeyListener {
        override fun keyPressed(evt: KeyEvent) {
            keys.add(evt.keyCode)
        }

        override fun keyReleased(evt: KeyEvent) {
            keys.remove(evt.keyCode)
        }

        override fun keyTyped(evt: KeyEvent) {
            // Not used
        }
    }

    fun isDown(keyCode: Int): Boolean {
        return keys.contains(keyCode)
    }
}