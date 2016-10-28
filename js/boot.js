var boot = function (game) {
};

boot.prototype = {
    preload: function () {
        this.game.load.image("loading", "img/loading.png");
    },
    create: function () {
        this.game.stage.backgroundColor = '#000000';
        this.game.state.clearCurrentState();
        this.game.state.start('Load');
    }
};