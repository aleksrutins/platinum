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
