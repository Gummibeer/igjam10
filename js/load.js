var load = function (game) {
};

load.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
    },
    create: function () {
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};