var load = function (game) {
};

load.prototype = {
    preload: function () {
        console.log('load.preload');
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        // Menu
        this.game.load.image('btn_start', 'img/btn_start.png');

        // Configs
        this.game.load.json('trains', 'config/trains.json');
        this.game.load.json('level-1', 'config/level-1.json');
        this.game.load.json('level-2', 'config/level-2.json');
        this.game.load.json('level-3', 'config/level-3.json');

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
        this.game.load.image('tex_train_head_green', 'img/textures/train_head_green.png');
        this.game.load.image('tex_train_body_green', 'img/textures/train_body_green.png');
        this.game.load.image('tex_train_head_red', 'img/textures/train_head_red.png');
        this.game.load.image('tex_train_body_red', 'img/textures/train_body_red.png');

        // UI
        this.game.load.image('ui_button_1', 'img/ui_button_1.png');
        this.game.load.image('ui_button_2', 'img/ui_button_2.png');

        // Backgrounds
        this.game.load.image('bg_menu', 'img/bg_menu.jpg');
        this.game.load.image('bg_level_1', 'img/bg_level_1.jpg');
        this.game.load.image('bg_level_2', 'img/bg_level_2.jpg');
        this.game.load.image('bg_level_3', 'img/bg_level_3.jpg');

        // Foregrounds
        this.game.load.image('fg_level_1', 'img/fg_level_1.png');
        this.game.load.image('fg_level_2', 'img/fg_level_2.png');
        this.game.load.image('fg_level_3', 'img/fg_level_3.png');
    },
    create: function () {
        console.log('load.create');
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};
