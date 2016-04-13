var Bullet = function(xPosition, yPosition, color, assetsManager) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.color = color;
    this.assetsManager = assetsManager;
    this.speed = this.getSpeed(this.color);
};

Bullet.prototype.update = function(delta) {
    if (this.color === "blue" || this.color === "green") {
        this.yPosition -= (this.speed / 10);
    } else {
        this.yPosition -= (this.speed / 10);
    }
};

Bullet.prototype.draw = function(ctx) {
    if (this.color === "blue") {
        ctx.drawImage(this.assetsManager.images["laserBlue1"],
            this.xPosition, this.yPosition);
        ctx.drawImage(this.assetsManager.images["laserBlue2"],
            this.xPosition, this.yPosition);
    } else if (this.color === "green") {
        ctx.drawImage(this.assetsManager.images["laserGreen1"],
            this.xPosition, this.yPosition);
        ctx.drawImage(this.assetsManager.images["laserGreen2"],
            this.xPosition, this.yPosition);
    } else if (this.color === "red") {
        ctx.drawImage(this.assetsManager.images["laserRed1"],
            this.xPosition, this.yPosition);
        ctx.drawImage(this.assetsManager.images["laserRed2"],
            this.xPosition, this.yPosition);
    } else {
        console.error(this.color + " is not a valid color!");
    }
};

Bullet.prototype.getSpeed = function(color) {
    if (color === "blue" || color === "red") {
        return 50;
    } else if (color === "green") {
        return 100;
    } else {
        console.error(color + " is not a valid color to determine bullet speed");
        return NaN;
    }
};