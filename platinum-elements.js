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
    this.game = this.parentElement._game
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
