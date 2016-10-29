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

        // Rails
        this.game.load.image('tex_rail_activator_active', 'img/textures/rail_activator_active.png');
        this.game.load.image('tex_rail_activator', 'img/textures/rail_activator.png');
        this.game.load.image('tex_rail_curve', 'img/textures/rail_curve.png');
        this.game.load.image('tex_rail_detector_active', 'img/textures/rail_detector_active.png');
        this.game.load.image('tex_rail_golden_active', 'img/textures/rail_golden_active.png');
        this.game.load.image('tex_rail_golden_inactive', 'img/textures/rail_golden_inactive.png');
        this.game.load.image('tex_rail_straight', 'img/textures/rail_straight.png');
        this.game.load.image('tex_rail_crossing', 'img/textures/rail_crossing.png');

        // Trains
        this.game.load.image('tex_train_empty', 'img/textures/train_empty.png');
        this.game.load.image('tex_train_chest_wood', 'img/textures/train_chest_wood.png');
        this.game.load.image('tex_train_diamond', 'img/textures/train_diamond.png');
        this.game.load.image('tex_train_cake', 'img/textures/train_cake.png');
        this.game.load.image('tex_train_enchant', 'img/textures/train_enchant.png');
    },
    create: function () {
        console.log('load.create');
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};
