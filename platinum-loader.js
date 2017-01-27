var Platinum = Platinum || {};
Platinum.Loader = {
    images: {}
};

Platinum.Loader.LoadImage = function (key, src) {
    var img = new Image();
    img.src = src;
  return {Blocking: function() {
    while(!this.images[key]) {};
    return this.images[key];
  }.bind(this)};
};
Platinum.Loader.GetImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};
