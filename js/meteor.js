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

    // xVelocity is later picked at random
    this.xVelocity = 0;
    this.yVelocity = 10;

    //this.isGoingUp = false;
    //this.isGoingDown = true;
    //this.isGoingLeft = false;
    //this.isGoingRight = false;

    //// TODO remove this
    //if (this.type === "medium") {
    //    this.isGoingDown = false;
    //    this.isGoingUp = true;
    //    this.yVelocity = this.yVelocity * (-1);
    //}

    this.rotationAngle = 0;
    this.rotationDelayCounter = 0;

    this.initialiseRoute();
};

Meteor.prototype.initialiseRoute = function() {
    // get random number between 0 to 4 inclusive
    var type = Math.floor(Math.random() * 5);
    //var type = 2;
    //console.log("Meteor route: " + type);

    switch (type) {
        case 0:
            this.isRotatingClockwise = false;
            this.xVelocity = -5;
            break;
        case 1:
            this.isRotatingClockwise = false;
            this.xVelocity = -8;
            break;
        case 2:
            this.isRotatingClockwise = true;
            break;
        case 3:
            this.isRotatingClockwise = true;
            this.xVelocity = 5;
            break;
        case 4:
            this.isRotatingClockwise = true;
            this.xVelocity = 8;
            break;
        default:
            console.error(type + " is not a valid type of route of a meteor!");
            break;
    }
};

Meteor.prototype.update = function(delta) {
    this.yPosition += (this.yVelocity / 10);
    this.xPosition += (this.xVelocity / 10);

    this.xCentre = this.xPosition + this.radius;
    this.yCentre = this.yPosition + this.radius;

    // rotation of the meteor
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

Meteor.prototype.isGoingDown = function() {
    return this.yVelocity > 0;
};

Meteor.prototype.isGoingUp = function() {
    return this.yVelocity < 0;
};

Meteor.prototype.isGoingRight = function() {
    return this.xVelocity > 0;
};

Meteor.prototype.isGoingLeft = function() {
    return this.xVelocity < 0;
};

Meteor.prototype.draw = function(ctx) {
    if (this.type === "big") {
        this.drawRotatedImage(ctx, this.assetsManager.images["meteorBig"],
            this.xCentre, this.yCentre, this.rotationAngle);
    } else if (this.type === "medium") {
        this.drawRotatedImage(ctx, this.assetsManager.images["meteorMedium"],
            this.xCentre, this.yCentre, this.rotationAngle);
    } else {
        this.drawRotatedImage(ctx, this.assetsManager.images["meteorTiny"],
            this.xCentre, this.yCentre, this.rotationAngle);
    }

    //ctx.fillStyle = "#fff";
    //ctx.beginPath();
    //ctx.arc(this.xCentre, this.yCentre, this.radius, 0, 2 * Math.PI);
    //ctx.stroke();
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