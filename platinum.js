// (C) 2016 munchkinhalfling <munchkin@rutins.com>
var Platinum = Platinum || {};
Object.prototype[Symbol.iterator] = function *() {
  for(let prop in this) {
    yield this[prop];
  }
};
var ImageSprite = (function(el, name, game, hasName, touchable, image, alt, w, h) {
  if(hasName) {
    el.setAttribute('id', name);
  };
  el.setAttribute('src', image);
  el.setAttribute('alt', alt);
  el.setAttribute('width', w);
  el.setAttribute('height', h);
  el.style.position = 'absolute';
  this.xg = 0;
  this.yg = 0;
  this.name = name;
  this.touchable = touchable;
  this.setX = function(x) {
    el.style.left = x.toString() + 'px';
    this.xg = x;
  };
  this.setY = function(y) {
    el.style.top = y.toString() + 'px';
    this.yg = y;
  };
  this.setPos = function(x, y) {
    this.setX(x);
    this.setY(y);
  };
  this.getX = function() {
    return JSON.parse(el.style.left.split('p')[0] || this.xg.toString());
  };
  this.getY = function() {
    return JSON.parse(el.style.top.split('p')[0] || this.yg.toString());
  };
  this.getPos = function() {
    return {x: this.getX(), y: this.getY()};
  };
  this.getSize = function() {
    return {w, h};
  };
  this.setClick = function(handler) {
    var __this = this;
    el.addEventListener('click', function() {
      handler(__this);
    });
  };
  this.detectCollision = function(anchorDeterminationFunc) {
    for(let otherSprite of game.sprites) {
      if(otherSprite != this && otherSprite instanceof ImageSprite && otherSprite.touchable) {
        var myPos = this.getPos();
        var mySize = this.getSize();
        var myAnchor = anchorDeterminationFunc(myPos.x, myPos.y);
        var otherPos = otherSprite.getPos();
        var otherSize = otherSprite.getSize();
        var otherAnchor = anchorDeterminationFunc(otherPos.x, otherPos.y);
        var deltaX = Math.abs(otherAnchor.x - myAnchor.x);
        var deltaY = Math.abs(otherAnchor.y - myAnchor.y);
        if (
          deltaX <= ((mySize.w + otherSize.w)/2) && 
          deltaY <= ((mySize.h + otherSize.h)/2)) {
          // collision - can return the object that it collided with          
          return otherSprite; 
        } else {
          // no collision
          // DO NOT RETURN!!!!!!!!!!!!!!!!!!!!!!!!!! Go check the next thing.
          // return false;
        }
      }
    }
    return false;
  };
  this._el = el;
});
ImageSprite._elType = 'img';
function ButtonSprite(el, name, text) {
  el.setAttribute('id', name);
  el.innerText = text;
  this._el = el;
  this.setClick = function(handler) {
    this._el.onclick = handler;
  }
}
ButtonSprite._elType = 'button';
var Game = (function(name) {
  this.sprites = {"base": this};
  if(Game.instant == null) {
    Game.instant = {};
  };
  Game.instant[name] = this;
  this.addSprite = function(spriteName, spriteType, canTouch, ...otherParms) {
    var spriteCont = document.createElement(window[spriteType]._elType);
    var sprite     = new window[spriteType](spriteCont, spriteName, this, true, canTouch, ...otherParms);
    this.viewWin.appendChild(spriteCont);
    this.sprites[spriteName] = sprite;
    return sprite;
  };
  this.getSprite = function(spriteName) {
    return this.sprites[spriteName];
  };
  this.getWin = function() { return this.viewWin; };
  this.onReady = function(f) {
    window.addEventListener('load', f);
  };
  this.clear = function() {
    this.viewWin.innerHTML = '';
  };
  this.copyDOM = function() {
    return this.viewWin.innerHTML;
  }
});
class TextSprite {
  constructor(el, name, text) {
    this.name = name;
    this.text = text;
    this.el = el;
  }
  setText(text) {
    this.text = text;
    this.el.innerHTML = text;
  }
}
window.TextSprite = TextSprite;
TextSprite._elType = 'span';
class GameArea extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.ref = this.getAttribute('ref');
    Game.instant[this.ref].viewWin = this;
    Game.instant[this.ref]._el = this;
    this._game = Game.instant[this.ref];
    var curStyle = this.getAttribute('style') || '';
    if(this.getAttribute('size') == 'full') {
      this.setAttribute('style', curStyle + 'width: ' + window.innerWidth + 'px !important; height: ' + window.innerHeight + 'px !important;');
    } else {
      let [w, h] = this.getAttribute('size').split(', ');
      this.setAttribute('style', curStyle + 'width: ' + w + 'px; height: ' + h + 'px;');
    }
  }
}
customElements.define('game-area', GameArea);
class SpriteElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.game = this.parentElement;
    var el = document.createElement(ImageSprite._elType);
    this.sprite = new ImageSprite(el, this.getAttribute('name'), this.game, false, !this.hasAttribute('untouchable'), this.getAttribute('image'), this.getAttribute('alt'), ...eval('[' + this.getAttribute('size') + ']'));
    this.game.sprites[this.getAttribute('name')] = this.sprite;
    this.appendChild(el);
    this.setAttribute('id', this.getAttribute('name'));
    window[this.getAttribute('name')] = this;
  }
}
customElements.define('image-sprite', SpriteElement);
class SpriteContainer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.setAttribute('id', this.getAttribute('name'));
    this._game = this.parentElement._game;
    this._game.sprites[this.getAttribute('name')] = this;
    var [w, h] = eval(this.getAttribute('size'));
    this.style.width = w;
    this.style.height = h;
  }
}
customElements.define('sprite-container', SpriteContainer);
class TextBlock extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = '';
    this.game = this.parentElement._game;
    this.sprite = new TextSprite(this, this.getAttribute('name'), this.getAttribute('text'));
    this.game.sprites[this.getAttribute('name')] = this.sprite;
    this.innerHTML = this.getAttribute('text');
    this.style.fontFamily = this.getAttribute('font');
    this.style.fontWeight = this.getAttribute('form');
    this.style.fontSize = this.getAttribute('size');
    if(this.hasAttribute('title')) this.style.display = 'block';
  }
}
customElements.define('text-block', TextBlock);
class EvListener extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.parentElement._game.getSprite(this.getAttribute('target'))._el.addEventListener(this.getAttribute('for'), window[this.getAttribute('func')]);
  }
}
customElements.define('event-listener', EvListener);
