var ScorePanel = function(assetsManager, spacecraft) {
    this.assetsManager = assetsManager;
    this.spacecraft = spacecraft;
};

ScorePanel.prototype.draw = function(ctx) {
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "20px kenvector_future_thin";
    ctx.fillText(this.spacecraft.livesRemaining, 540, 30);
    ctx.drawImage(this.assetsManager.images["livesRemaining"], 555, 10);

    ctx.fillText("Score: " + this.spacecraft.score, 10, 28);
};