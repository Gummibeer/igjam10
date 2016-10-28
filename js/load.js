var load = function (game) {
};

load.prototype = {
    preload: function () {
        console.log('load.preload');
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        // Menu
        this.game.load.image('btn-start', 'img/btn-start.png');

        // Configs
        this.game.load.json('trains', 'config/trains.json');
        this.game.load.json('level-1', 'config/level-1.json');

        // Objects
        this.game.load.image('rail_curve', 'img/objects/rail_curve.png');
        this.game.load.image('rail_normal', 'img/objects/rail_normal.png');
    },
    create: function () {
        console.log('load.create');
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};
