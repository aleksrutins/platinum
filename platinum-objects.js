var Platinum = Platinum || {};
var _evlist = {
  _isreg(esn) {
    return this[esn]? true : false;
  }
};
class PlatinumObject {};
class PEventListener extends PlatinumObject {
  constructor(f, esn) {
    super();
    var evns = esn.split(':')[0];
    var evn = esn.split(':')[1];
    if(!_evlist._isreg(evn)) {
      _evlist[evn] = [];
      eval(evns)[evn] = (e) => {
        for(let f of _evlist[evn]) {
          f(e);
        }
      }
    }
    _evlist[evn].push(f);
    this._trig = f;
  }
  trigger(e = null) {
  this._trig(e);
}
}

class Component extends PlatinumObject {}
class PWindow extends Component {
  constructor(content) {super();this.content = content;}
  show() {alert(this.content);}
}
function PButton(text, click) {
  var that = document.createElement('button');
  new PEventListener(click, 'that:onclick');
  that.textContent = text;
}
Platinum.Objects = {PlatinumObject, PEventListener, Component, PWindow, PButton};
