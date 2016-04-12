var Game = function(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.inputManager = new InputManager(this);
    this.inputManager.registerKeyListener();
    this.inputManager.registerMouseListener();

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

    this.spacecraft = new Spacecraft(this.inputManager);
};

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
    this.spacecraft.update();
};

Game.prototype.render = function() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.spacecraft.draw(this.context);
};




