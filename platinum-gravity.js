var Platinum = Platinum || {};
Platinum.GravityManager = class {
  constructor(game, gravLevel) {
    this._game = game;
    this._timer = null;
    this.yv = {};
    for(let sprite of game.sprites) {
      this.yv[sprite.name] = -(gravLevel);
    };
  }
  startGravity() {
    var game = this._game;
    this._timer = setInterval(() => {
      for(let sprite of game.sprites) {
        if(sprite.touchable) {
          if((sprite.getY() + 124) < WindowManager.getWindowDimensions().height && !sprite.detectCollisionRect()) {
            sprite.setY(sprite.getY() + -(this.yv[sprite.name]));
            this.yv[sprite.name] -= .5;
          } else {
            this.yv[sprite.name] = 0;
          };
        };
      };
    }, 100);
  }
  stopGravity() {
    clearInterval(this._timer);
  }
};
