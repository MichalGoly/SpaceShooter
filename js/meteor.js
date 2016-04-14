var Meteor = function(xCentre, yCentre, type, assetsManager) {
    this.xCentre = xCentre;
    this.yCentre = yCentre;
    this.type = type;
    this.assetsManager = assetsManager;

    if (this.type === "big") {
        this.radius = 48;
        this.mass = 500;
    } else if (this.type === "medium") {
        this.radius = 21;
        this.mass = 250;
    } else if (this.type === "tiny") {
        this.radius = 9;
        this.mass = 50;
    } else {
        console.error(this.type + " is not a valid type of a meteor!");
    }

    this.xPosition = this.xCentre - this.radius;
    this.yPosition = this.yCentre - this.radius;

    this.xVelocity = 0;
    this.yVelocity = 10;

    this.isGoingUp = false;
    this.isGoingDown = true;
    this.isGoingLeft = false;
    this.isGoingRight = false;

    this.isRotatingClockwise = true;
    this.rotationAngle = 0;
    this.rotationDelayCounter = 0;
};

Meteor.prototype.update = function(delta) {
    if (this.isGoingUp) {
        this.yPosition -= (this.yVelocity / 10); // avoid using 0.1 accelerateFactor
    } else if (this.isGoingDown) {
        this.yPosition += (this.yVelocity / 10);
    }

    if (this.isGoingRight) {
        this.xPosition += (this.xVelocity / 10);
    } else if (this.isGoingLeft) {
        this.xPosition -= (this.xVelocity / 10);
    }

    this.rotationDelayCounter += delta;

    if (this.rotationDelayCounter > 25) {
        if (this.isRotatingClockwise) {
            this.rotationAngle += 1;
        } else {
            this.rotationAngle -= 1;
        }
        this.rotationDelayCounter = 0;
    }
};

Meteor.prototype.draw = function(ctx) {
    if (this.type === "big") {
        this.drawRotatedImage(ctx, this.assetsManager.images["meteorBig"],
            this.xPosition, this.yPosition, this.rotationAngle);
    } else if (this.type === "medium") {
        this.drawRotatedImage(ctx, this.assetsManager.images["meteorMedium"],
            this.xPosition, this.yPosition, this.rotationAngle);
    } else {
        this.drawRotatedImage(ctx, this.assetsManager.images["meteorTiny"],
            this.xPosition, this.yPosition, this.rotationAngle);
    }
};

// Inspired by the example here by Seb Lee-Delisle
// http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
Meteor.prototype.drawRotatedImage = function(ctx, image, xPosition, yPosition, angle) {
    ctx.save();
    ctx.translate(xPosition, yPosition);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(image, -(image.width / 2), -(image.height / 2));
    ctx.restore();
};