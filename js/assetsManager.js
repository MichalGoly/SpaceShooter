var AssetsManager = function() {
    this.images = [];
};

AssetsManager.prototype.loadAll = function() {
    this.images["spacecraft"] = new Image();
    this.images["spacecraft"].src = "assets/PNG/playerShip2_blue.png";
    this.images["background"] = new Image();
    this.images["background"].src = "assets/Backgrounds/blue.png";
};
