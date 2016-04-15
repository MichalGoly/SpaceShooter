var AssetsManager = function() {
    this.images = [];
};

// assets by Kenney Vleugels (www.kenney.nl)
AssetsManager.prototype.loadAll = function() {
    this.images["spacecraft"] = new Image();
    this.images["spacecraft"].src = "assets/PNG/playerShip2_blue.png";

    this.images["spacecraftSmallDamage"] = new Image();
    this.images["spacecraftSmallDamage"].src = "assets/PNG/Damage/playerShip2_damage1.png";
    this.images["spacecraftMediumDamage"] = new Image();
    this.images["spacecraftMediumDamage"].src = "assets/PNG/Damage/playerShip2_damage2.png";
    this.images["spacecraftBigDamage"] = new Image();
    this.images["spacecraftBigDamage"].src = "assets/PNG/Damage/playerShip2_damage3.png";

    this.images["shield1"] = new Image();
    this.images["shield1"].src = "assets/PNG/Effects/shield1.png";
    this.images["shield2"] = new Image();
    this.images["shield2"].src = "assets/PNG/Effects/shield2.png";
    this.images["shield3"] = new Image();
    this.images["shield3"].src = "assets/PNG/Effects/shield3.png";

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
