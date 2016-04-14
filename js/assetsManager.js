var AssetsManager = function() {
    this.images = [];
};

AssetsManager.prototype.loadAll = function() {
    this.images["spacecraft"] = new Image();
    this.images["spacecraft"].src = "assets/PNG/playerShip2_blue.png";

    this.images["background"] = new Image();
    this.images["background"].src = "assets/Backgrounds/blueBig.png";

    this.images["laserBlue1"] = new Image();
    this.images["laserBlue1"].src = "assets/PNG/Lasers/laserBlue02.png";
    this.images["laserBlue2"] = new Image();
    this.images["laserBlue2"].src = "assets/PNG/Lasers/laserBlue06.png";
    this.images["laserGreen1"] = new Image();
    this.images["laserGreen1"].src = "assets/PNG/Lasers/laserGreen04.png";
    this.images["laserGreen2"] = new Image();
    this.images["laserGreen2"].src = "assets/PNG/Lasers/laserGreen12.png";
    this.images["laserRed1"] = new Image();
    this.images["laserRed1"].src = "assets/PNG/Lasers/laserRed02.png";
    this.images["laserRed2"] = new Image();
    this.images["laserRed2"].src = "assets/PNG/Lasers/laserRed06.png";

    this.images["meteorBig"] = new Image();
    this.images["meteorBig"].src = "assets/PNG/Meteors/meteorBrown_big4.png";
    this.images["meteorMedium"] = new Image();
    this.images["meteorMedium"].src = "assets/PNG/Meteors/meteorGrey_med1.png";
    this.images["meteorTiny"] = new Image();
    this.images["meteorTiny"].src = "assets/PNG/Meteors/meteorBrown_tiny1.png";
};
