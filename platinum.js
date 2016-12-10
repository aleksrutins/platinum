Object.prototype[Symbol.iterator] = function *() {
  for(let prop in this) {
    yield this[prop];
  }
};
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
