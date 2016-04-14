var Game = function(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.inputManager = new InputManager(this);
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
    this.lives = 3;

    this.background = new Background(this.canvas, this.assetsManager);
    this.spacecraft = new Spacecraft(this.canvas, this.inputManager, this.assetsManager);

    this.meteor1 = new Meteor(150, 50, "big", this.assetsManager);
    this.meteor2 = new Meteor(300, 50, "medium", this.assetsManager);
    this.meteor3 = new Meteor(500, 50, "tiny", this.assetsManager);
};

// https://coderwall.com/p/iygcpa/gameloop-the-correct-way
Game.prototype.run = function() {
    window.requestAnimationFrame(this.run.bind(this));

    this.currentTime = new Date().getTime();
    this.delta = this.currentTime - this.lastTime;

    if (this.delta > this.interval) {
        this.update(this.delta);
        this.render();

        this.lastTime = this.currentTime - (this.delta % this.interval);
    }
};

Game.prototype.update = function(delta) {
    this.background.update();
    this.spacecraft.update(delta);

    this.meteor1.update(delta);
    this.meteor2.update(delta);
    this.meteor3.update(delta);
};

Game.prototype.render = function() {
    this.background.draw(this.context);
    this.spacecraft.draw(this.context);

    this.meteor1.draw(this.context);
    this.meteor2.draw(this.context);
    this.meteor3.draw(this.context);
};





