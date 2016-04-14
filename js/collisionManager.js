var CollisionManager = function(game) {
    this.game = game;
    this.spacecraft = game.spacecraft;
    this.meteors = game.meteors;
};

CollisionManager.prototype.checkAndResolve = function() {
    this.checkMeteorsWithMeteors();
    this.checkSpacecraftWithWalls();
};

CollisionManager.prototype.checkMeteorsWithMeteors = function() {

};

CollisionManager.prototype.checkSpacecraftWithWalls = function() {
    if (this.spacecraft.xPosition < 5) {
        //console.log("LEFT");
        this.spacecraft.isGoingLeft = false;
        this.spacecraft.xVelocity = 0;
        this.spacecraft.isLeftWall = true;
    }

    if (this.spacecraft.xPosition + this.spacecraft.width + 5 > this.game.canvas.width) {
        //console.log("RIGHT");
        this.spacecraft.isGoingRight = false;
        this.spacecraft.xVelocity = 0;
        this.spacecraft.isRightWall = true;
    }

    if (this.spacecraft.yPosition < 5) {
        //console.log("TOP");
        this.spacecraft.isGoingUp = false;
        this.spacecraft.yVelocity = 0;
        this.spacecraft.isUpWall = true;
    }

    if (this.spacecraft.yPosition + this.spacecraft.height + 5 > this.game.canvas.height) {
        //console.log("BOTTOM");
        this.spacecraft.isGoingDown = false;
        this.spacecraft.yVelocity = 0;
        this.spacecraft.isDownWall = true;
    }
};