package platinum.input;

import java.util.HashSet;
import java.util.Set;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyboardManager {
    public KeyboardManager(java.awt.Component thingy) {
        thingy.addKeyListener(new Listener());
    }

    private Set<Integer> keys = new HashSet<>();

    private class Listener implements KeyListener {

        @Override
        public void keyPressed(KeyEvent evt) {
            keys.add(evt.getKeyCode());
        }

        @Override
        public void keyReleased(KeyEvent evt) {
            keys.remove(evt.getKeyCode());
        }

        @Override
        public void keyTyped(KeyEvent evt) {
            // Not used
        }

    }

    public boolean isDown(int keyCode) {
        return keys.contains(keyCode);
    }
}
