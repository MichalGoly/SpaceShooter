var Spacecraft = function() {
    this.sprite = new Image("assets/PNG/playerShip2_blue.png");
    this.xPosition = 380;
    this.yPosition = 500;
    this.width = this.sprite.width;
    this.heigh = this.sprite.height;
    this.lives = 3;
    this.bullets = [];
};

//TODO make sure spacecraft cannot go off the screen
Spacecraft.prototype.updateXPosition = function(x) {
    this.xPosition = x;
};

//TODO make sure spacecraft cannot go off the screen
Spacecraft.prototype.updateYPosition = function(y) {
    this.yPosition = y;
};

Spacecraft.prototype.draw = function(ctx) {
    ctx.drawImage(this.sprite, this.xPosition, this.yPosition, this.width, this.heigh);
};