# Platinum.JS
A JS game library.

## Demo
This is a short demo of Platinum.JS
### Step 1: create the HTML
create a new file called __index.html__ and put the following code in it:
<pre>
  &lt;!doctype html&gt;
  
  &lt;html&gt;
    &lt;head&gt;
      &lt;meta charset='utf-8'&gt;
      &lt;title&gt;My Game&lt;/title&gt;
      &lt;script src='path/to/platinum.js'&gt;&lt;/script&gt;
      &lt;script src='app.js'&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;game-area ref='MyGame'&gt;
        &lt;text-block name='mytext' text='THIS SHALL BE CHANGED' font='Arial' form='' size='xx-large'&gt;&lt;/text-block&gt;
      &lt;/game-area&gt;
    &lt;/body&gt;
  &lt;/html&gt;
</pre>
### Step 2: create the JavaScript
create *another* file called __app.js__, and put the following code in it:
<pre>
  (game => {
    game.getSprite('mytext').setText('This has been changed');
  })(new Game('MyGame'));
</pre>
### Step 3: Enable ES6
Install Google Chrome if you don't already have it, and go to __chrome://flags__.<br/>
You should see a bunch of tempting things, but scroll down until you see the one that says 'Experimental JavaScript'.<br/>
Enable it.
### Step 4: Yer done, so run it!
Now, open up index.html in Chrome, and you should see a piece of text in the top-left corner that says 'This has been changed.'<br/>
That's all, Folks!
