var InputManager = function() {
    this.keys = [];
};

InputManager.prototype.registerKeyListener = function() {
    document.addEventListener("keydown", function(event) {
        this.keys[event.which] = true;
    }.bind(this), false);

    document.addEventListener("keyup", function(event) {
        this.keys[event.which] = false;
    }.bind(this), false);
};

InputManager.prototype.registerMouseListener = function() {

};