var GameplayManager = function(game) {
    this.canvas = game.canvas;
    this.assetsManager = game.assetsManager;
    this.meteors = game.meteors;
    this.enemies = game.enemies;
    this.powerUps = game.powerUps;
    this.spacecraft = game.spacecraft;

    this.enemiesSpawnDelay = 5000;
    this.enemiesSpawnDelayTimer = 0;

    this.meteorsSpawnDelay = 3000;
    this.meteorsSpawnDelayTimer = 0;

    this.powerUpsSpawnDelay = 10000;
    this.powerUpsSpawnDelayTimer = 0;

    this.cleanUpDelay = 15000;
    this.cleanUpDelayTimer = 0;

    this.difficultyDelay = 30000;
    this.difficultyDelayTimer = 0;
};

GameplayManager.prototype.update = function(delta) {
    this.spawnMeteors(delta);
    this.spawnEnemies(delta);
    this.spawnPowerUps(delta);

    // clean up every 15 seconds
    this.cleanUpDelayTimer += delta;

    if (this.cleanUpDelayTimer > this.cleanUpDelay) {
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].isExploded || this.isOffCanvas(this.enemies[i])) {
                this.enemies.splice(i, 1);
                i--;
            }
        }

        for (var i = 0; i < this.meteors.length; i++) {
            if (this.meteors[i].isExploded || this.isOffCanvas(this.meteors[i])) {
                this.meteors.splice(i, 1);
                i--;
            }
        }

        this.cleanUpDelayTimer = 0;
    }
};

GameplayManager.prototype.spawnMeteors = function(delta) {
    this.meteorsSpawnDelayTimer += delta;

    if (this.meteorsSpawnDelayTimer > this.meteorsSpawnDelay) {
        this.meteors.push(new Meteor(this.getMeteorXCentre(), this.getMeteorYCentre(),
            this.getMeteorType(), this.assetsManager));

        this.meteorsSpawnDelayTimer = 0;
    }
};

GameplayManager.prototype.spawnEnemies = function(delta) {
    this.enemiesSpawnDelayTimer += delta;

    if (this.enemiesSpawnDelayTimer > this.enemiesSpawnDelay) {
        this.enemies.push(new Enemy(this.getEnemyXPosition(), this.getEnemyYPosition(),
            this.getEnemyType(), this.assetsManager, this.spacecraft));

        this.enemiesSpawnDelayTimer = 0;
    }
};

GameplayManager.prototype.spawnPowerUps = function(delta) {
    this.powerUpsSpawnDelayTimer += delta;
};

// get random integer between 100 and canvas - 100
GameplayManager.prototype.getMeteorXCentre = function() {
    return this.getIntegerBetween(100, this.canvas.width - 100);
};

// get random integer between -150 and -50
GameplayManager.prototype.getMeteorYCentre = function() {
    return this.getIntegerBetween(-60, -50);
};

GameplayManager.prototype.getMeteorType = function() {
    var choice = this.getIntegerBetween(0, 2);

    if (choice === 0) {
        return "big"
    } else if (choice === 1) {
        return "medium";
    } else {
        return "tiny";
    }
};

// get random integer between 100 and canvas - 100
GameplayManager.prototype.getEnemyXPosition = function() {
    return this.getIntegerBetween(100, this.canvas.width - 100);
};

// get random integer between -150 and -50
GameplayManager.prototype.getEnemyYPosition = function() {
    return this.getIntegerBetween(-60, -50);
};

GameplayManager.prototype.getEnemyType = function() {
    var choice = this.getIntegerBetween(0, 3);

    if (choice === 0) {
        return "enemyBlue"
    } else if (choice === 1) {
        return "enemyRed";
    } else if (choice === 2) {
        return "enemyGreen";
    } else {
        return "enemyBlack";
    }
};

GameplayManager.prototype.isOffCanvas = function(entity) {
    return entity.xPosition < -300 || entity.xPosition > this.canvas.width + 300
        || entity.yPosition < -300 || entity.yPosition > this.canvas.height + 300;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
GameplayManager.prototype.getIntegerBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};