var load = function (game) {
};

load.prototype = {
    preload: function () {
        console.log('load.preload');
        var loadingBar = this.add.sprite(this.game.world.centerX - 95, this.game.world.centerY, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        // Menu
        this.game.load.image('btn_start', 'img/btn_start.png');

        // Configs
        this.game.load.json('trains', 'config/trains.json');
        this.game.load.json('level-0', 'config/level-0.json');
        this.game.load.json('level-1', 'config/level-1.json');
        this.game.load.json('level-2', 'config/level-2.json');
        this.game.load.json('level-3', 'config/level-3.json');
        this.game.load.json('level-4', 'config/level-4.json');

        // Rails
        this.game.load.image('tex_rail_curve', 'img/textures/rail_curve.png');
        this.game.load.image('tex_rail_straight', 'img/textures/rail_straight.png');
        this.game.load.image('tex_rail_crossing', 'img/textures/rail_crossing.png');

        this.game.load.image('tex_speed_up_base', 'img/textures/speed_up_base.png');
        this.game.load.image('tex_speed_up_dome', 'img/textures/speed_up_dome.png');
        this.game.load.image('tex_slow_down_base', 'img/textures/slow_down_base.png');
        this.game.load.image('tex_slow_down_dome', 'img/textures/slow_down_dome.png');

        // Trains
        this.game.load.image('tex_train_head_green', 'img/textures/train_head_green.png');
        this.game.load.image('tex_train_body_green', 'img/textures/train_body_green.png');
        this.game.load.image('tex_train_tail_green', 'img/textures/train_tail_green.png');

        this.game.load.image('tex_train_head_red', 'img/textures/train_head_red.png');
        this.game.load.image('tex_train_body_red', 'img/textures/train_body_red.png');
        this.game.load.image('tex_train_tail_red', 'img/textures/train_tail_red.png');

        this.game.load.image('tex_train_head_blue', 'img/textures/train_head_blue.png');
        this.game.load.image('tex_train_body_blue', 'img/textures/train_body_blue.png');
        this.game.load.image('tex_train_tail_blue', 'img/textures/train_tail_blue.png');

        this.game.load.image('tex_train_head_purple', 'img/textures/train_head_purple.png');
        this.game.load.image('tex_train_body_purple', 'img/textures/train_body_purple.png');
        this.game.load.image('tex_train_tail_purple', 'img/textures/train_tail_purple.png');

        // UI
        this.game.load.image('ui_button_slow_down', 'img/ui_button_slow_down.png');
        this.game.load.image('ui_button_slow_down_active', 'img/ui_button_slow_down_active.png');
        this.game.load.image('ui_slow_down_dragging', 'img/ui_slow_down_dragging.png');
        this.game.load.image('ui_button_speed_up', 'img/ui_button_speed_up.png');
        this.game.load.image('ui_button_speed_up_active', 'img/ui_button_speed_up_active.png');
        this.game.load.image('ui_speed_up_dragging', 'img/ui_speed_up_dragging.png');
        this.game.load.image('ui_ant_scientist', 'img/ui_ant_scientist.png');

        // Backgrounds
        this.game.load.image('bg_menu', 'img/bg_menu.jpg');
        this.game.load.image('bg_level_1', 'img/bg_level_1.jpg');
        this.game.load.image('bg_level_2', 'img/bg_level_2.jpg');
        this.game.load.image('bg_level_3', 'img/bg_level_3.jpg');
        this.game.load.image('bg_game_over_cemetery', 'img/bg_game_over_cemetery.jpg');
        this.game.load.image('bg_game_over_coffin', 'img/bg_game_over_coffin.jpg');
        this.game.load.image('bg_game_over_skull', 'img/bg_game_over_skull.jpg');
        this.game.load.image('bg_game_over_blood', 'img/bg_game_over_blood.jpg');
        this.game.load.image('bg_game_over_crutch', 'img/bg_game_over_crutch.jpg');

        this.game.load.image('bg_game_won_candy_1', 'img/bg_game_won_candy_1.jpg');
        this.game.load.image('bg_game_won_candy_2', 'img/bg_game_won_candy_2.jpg');
        this.game.load.image('bg_game_won_corn', 'img/bg_game_won_corn.jpg');
        this.game.load.image('bg_game_won_centipede', 'img/bg_game_won_centipede.jpg');

        // Foregrounds
        this.game.load.image('fg_level_1', 'img/fg_level_1.png');
        this.game.load.image('fg_level_2', 'img/fg_level_2.png');
        this.game.load.image('fg_level_3', 'img/fg_level_3.png');

        // Images
        this.game.load.image('circle_black', 'img/circle_black.png');

        // Audio
        this.game.load.audio('bg_ingame', ['audio/bg_ingame.mp3', 'audio/bg_ingame.ogg']);
        this.game.load.audio('fx_train_crash', ['audio/fx_train_crash.mp3', 'audio/fx_train_crash.ogg']);
    },
    create: function () {
        console.log('load.create');
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};
