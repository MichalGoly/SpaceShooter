var Game = function(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.inputManager = new InputManager();
    this.inputManager.registerKeyListener();
    this.inputManager.registerMouseListener();
    this.assetsManager = new AssetsManager();
    this.assetsManager.loadAll();

    // game loop variables
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.lastTime = new Date().getTime();
    this.currentTime = 0;
    this.delta = 0;
};

Game.prototype.newGame = function() {
    this.score = 0;

    this.background = new Background(this.canvas, this.assetsManager);
    this.spacecraft = new Spacecraft(this.canvas, this.inputManager, this.assetsManager);
    this.meteors = [];
    this.meteors.push(new Meteor(100, 50, "big", this.assetsManager));
    this.meteors.push(new Meteor(190, 50, "medium", this.assetsManager));
    this.meteors.push(new Meteor(500, 50, "tiny", this.assetsManager));
    this.meteors.push(new Meteor(300, 300, "medium", this.assetsManager));

    this.powerUps = [];
    this.powerUps.push(new PowerUp(400, 400, "boltPower", this.assetsManager));
    this.powerUps.push(new PowerUp(200, 200, "shieldPower", this.assetsManager));
    this.powerUps.push(new PowerUp(100, 300, "boltPower", this.assetsManager));


    this.collisionManager = new CollisionManager(this);
};

// https://coderwall.com/p/iygcpa/gameloop-the-correct-way
Game.prototype.run = function() {
    window.requestAnimationFrame(this.run.bind(this));

    this.currentTime = new Date().getTime();
    this.delta = this.currentTime - this.lastTime;

    if (this.delta > this.interval) {
        this.update(this.delta);
        this.collisionManager.checkAndResolve(this.delta);
        this.render();

        this.lastTime = this.currentTime - (this.delta % this.interval);
    }
};

Game.prototype.update = function(delta) {
    this.background.update();
    this.spacecraft.update(delta);

    for (var i = 0; i < this.meteors.length; i++) {
        this.meteors[i].update(delta);
    }

    // TODO clean up meteors off the screen and meteors blowed up
};

Game.prototype.render = function() {
    this.background.draw(this.context);
    this.spacecraft.draw(this.context);

    for (var i = 0; i < this.meteors.length; i++) {
        this.meteors[i].draw(this.context);
    }

    for (var i = 0; i < this.powerUps.length; i++) {
        this.powerUps[i].draw(this.context);
    }
};





