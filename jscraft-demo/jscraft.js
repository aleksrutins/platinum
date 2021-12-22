((game) => {
  game.onReady(function() {
    //var win = game.getSprite('placeholderWin')
    var hintsBox = document.getElementById('hints');
    var domCounter = document.getElementById('counter');
    var bi = 0;
    var yv = {};
    var gravityManager = new Platinum.GravityManager(game);
    gravityManager.startGravity();
    //win._el.style.zIndex = '-1';
    game.getWin().addEventListener('click', e => {
      var x = e.offsetX;
      var y = e.offsetY;
      var curBlock = game.addSprite('block' + bi, 'ImageSprite', true, 'block.svg', '[block]', 100, 100);
      domCounter.innerHTML = (24 - bi).toString();
      yv[curBlock.name] = -2;
      curBlock.setPos(x - 50, y - 50);
      //curBlock._el.style.zIndex = bi;
      hintsBox.style.zIndex = (bi + 1).toString();
      bi++;
      if(bi == 25 || bi > 25) {
        gravityManager.stopGravity();
        //game.clear();
        var ohhb = game.addSprite('100blocks', 'ImageSprite', true, 'win.svg', 'You have placed 25 blocks!', 1000, 500);
        ohhb._el.style.zIndex = 26;
        ohhb._el.style.float = 'right';
        ohhb.setClick(function(spr) {location.reload()});
        hintsBox.style.display = 'none';
      };
    });
  });
})(new Game('JSCraft', {pointerLock: false, isFullScreen: true}));
