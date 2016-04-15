var CollisionManager = function(game) {
    this.game = game;
    this.spacecraft = game.spacecraft;
    this.meteors = game.meteors;

    this.collisionDelayTimer = 0;
};

CollisionManager.prototype.checkAndResolve = function(delta) {
    this.collisionDelayTimer += delta;

    if (this.collisionDelayTimer > 10) {
        this.checkMeteorsWithMeteors();
        this.collisionDelayTimer = 0;
    }

    this.checkSpacecraftWithWalls();
};

CollisionManager.prototype.checkMeteorsWithMeteors = function() {
    if (this.meteors.length < 2) {
        return;
    }

    for (var i = 0; i < this.meteors.length - 1; i++) {
        var distanceX = this.meteors[i].xCentre - this.meteors[i + 1].xCentre;
        var distanceY = this.meteors[i].yCentre - this.meteors[i + 1].yCentre;
        var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // 2D circle collision detection
        if (this.meteors[i].radius + this.meteors[i + 1].radius > distance) {
            console.log("COLLISION METEORS");

            var tempVelX = this.meteors[i].xVelocity;
            var tempVelY = this.meteors[i].yVelocity;
            var totalMass = this.meteors[i].mass + this.meteors[i + 1].mass;

            //console.log("HEHE " + tempVelX + ", " + tempVelY);

            // velocity after elastic collision
            this.meteors[i].xVelocity = (this.meteors[i].xVelocity
                * (this.meteors[i].mass - this.meteors[i + 1].mass) + 2
                * this.meteors[i + 1].mass * this.meteors[i + 1].xVelocity) / totalMass;

            this.meteors[i].yVelocity = (this.meteors[i].yVelocity
                * (this.meteors[i].mass - this.meteors[i + 1].mass) + 2
                * this.meteors[i + 1].mass * this.meteors[i + 1].yVelocity) / totalMass;

            this.meteors[i + 1].xVelocity = (this.meteors[i + 1].xVelocity
                * (this.meteors[i + 1].mass - this.meteors[i].mass) + 2
                * this.meteors[i].mass * tempVelX) / totalMass;

            this.meteors[i + 1].yVelocity = (this.meteors[i + 1].yVelocity
                * (this.meteors[i + 1].mass - this.meteors[i].mass) + 2
                * this.meteors[i].mass * tempVelY) / totalMass;


            //console.log("ax:" + this.meteors[i].xVelocity);
            //console.log("ay:" + this.meteors[i].yVelocity);
            //console.log("bx:" + this.meteors[i + 1].xVelocity);
            //console.log("by:" + this.meteors[i + 1].yVelocity);

            this.meteors[i].updateRotation(this.meteors[i + 1].xCentre);
            this.meteors[i + 1].updateRotation(this.meteors[i].xCentre);
        }
    }
};

CollisionManager.prototype.checkSpacecraftWithWalls = function() {
    if (this.spacecraft.xPosition < 5) {
        console.log("LEFT");
        this.spacecraft.xVelocity = 0;
        this.spacecraft.isLeftWall = true;
        this.spacecraft.xPosition = 5;
    }

    if (this.spacecraft.xPosition + this.spacecraft.width + 5 > this.game.canvas.width) {
        console.log("RIGHT");
        this.spacecraft.xVelocity = 0;
        this.spacecraft.isRightWall = true;
        this.spacecraft.xPosition = this.game.canvas.width - this.spacecraft.width - 5;
    }

    if (this.spacecraft.yPosition < 5) {
        console.log("TOP");
        this.spacecraft.yVelocity = 0;
        this.spacecraft.isUpWall = true;
        this.spacecraft.yPosition = 5;
    }

    if (this.spacecraft.yPosition + this.spacecraft.height + 5 > this.game.canvas.height) {
        console.log("BOTTOM");
        this.spacecraft.yVelocity = 0;
        this.spacecraft.isDownWall = true;
        this.spacecraft.yPosition = this.game.canvas.height - this.spacecraft.height - 5;
    }
};