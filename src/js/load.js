var load = function (game) {
};

load.prototype = {
    preload: function () {
        console.log('load.preload');
        var loadingBar = this.add.sprite(this.game.world.centerX - 95, this.game.world.centerY, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        // Menu
        this.game.load.image('btn_start', 'src/img/btn_start.png');

        // Configs
        this.game.load.json('trains', 'src/config/trains.json');
        this.game.load.json('levels', 'src/config/levels.json');
        this.game.load.json('level-0', 'src/config/level-0.json');
        this.game.load.json('level-1', 'src/config/level-1.json');
        this.game.load.json('level-2', 'src/config/level-2.json');
        this.game.load.json('level-3', 'src/config/level-3.json');
        this.game.load.json('level-4', 'src/config/level-4.json');

        // Rails
        this.game.load.image('tex_rail_curve', 'src/img/textures/rail_curve.png');
        this.game.load.image('tex_rail_straight', 'src/img/textures/rail_straight.png');
        this.game.load.image('tex_rail_crossing', 'src/img/textures/rail_crossing.png');

        this.game.load.image('tex_speed_up_base', 'src/img/textures/speed_up_base.png');
        this.game.load.image('tex_speed_up_dome', 'src/img/textures/speed_up_dome.png');
        this.game.load.image('tex_slow_down_base', 'src/img/textures/slow_down_base.png');
        this.game.load.image('tex_slow_down_dome', 'src/img/textures/slow_down_dome.png');

        // Trains
        this.game.load.image('tex_train_head_green', 'src/img/textures/train_head_green.png');
        this.game.load.image('tex_train_body_green', 'src/img/textures/train_body_green.png');
        this.game.load.image('tex_train_tail_green', 'src/img/textures/train_tail_green.png');

        this.game.load.image('tex_train_head_red', 'src/img/textures/train_head_red.png');
        this.game.load.image('tex_train_body_red', 'src/img/textures/train_body_red.png');
        this.game.load.image('tex_train_tail_red', 'src/img/textures/train_tail_red.png');

        this.game.load.image('tex_train_head_blue', 'src/img/textures/train_head_blue.png');
        this.game.load.image('tex_train_body_blue', 'src/img/textures/train_body_blue.png');
        this.game.load.image('tex_train_tail_blue', 'src/img/textures/train_tail_blue.png');

        this.game.load.image('tex_train_head_purple', 'src/img/textures/train_head_purple.png');
        this.game.load.image('tex_train_body_purple', 'src/img/textures/train_body_purple.png');
        this.game.load.image('tex_train_tail_purple', 'src/img/textures/train_tail_purple.png');

        // UI
        this.game.load.image('ui_button_slow_down', 'src/img/ui_button_slow_down.png');
        this.game.load.image('ui_button_slow_down_active', 'src/img/ui_button_slow_down_active.png');
        this.game.load.image('ui_slow_down_dragging', 'src/img/ui_slow_down_dragging.png');
        this.game.load.image('ui_button_speed_up', 'src/img/ui_button_speed_up.png');
        this.game.load.image('ui_button_speed_up_active', 'src/img/ui_button_speed_up_active.png');
        this.game.load.image('ui_speed_up_dragging', 'src/img/ui_speed_up_dragging.png');
        this.game.load.image('ui_ant_scientist', 'src/img/ui_ant_scientist.png');

        // Backgrounds
        this.game.load.image('bg_menu', 'src/img/bg_menu.jpg');
        this.game.load.image('bg_level_picker', 'src/img/bg_level_picker.jpg');
        this.game.load.image('bg_intro', 'src/img/bg_intro.jpg');
        this.game.load.image('bg_level_0', 'src/img/bg_level_0.jpg');
        this.game.load.image('bg_level_1', 'src/img/bg_level_1.jpg');
        this.game.load.image('bg_level_2', 'src/img/bg_level_2.jpg');
        this.game.load.image('bg_level_3', 'src/img/bg_level_3.jpg');
        this.game.load.image('bg_level_4', 'src/img/bg_level_4.jpg');
        this.game.load.image('bg_game_over_cemetery', 'src/img/bg_game_over_cemetery.jpg');
        this.game.load.image('bg_game_over_coffin', 'src/img/bg_game_over_coffin.jpg');
        this.game.load.image('bg_game_over_skull', 'src/img/bg_game_over_skull.jpg');
        this.game.load.image('bg_game_over_blood', 'src/img/bg_game_over_blood.jpg');
        this.game.load.image('bg_game_over_crutch', 'src/img/bg_game_over_crutch.jpg');

        this.game.load.image('bg_game_won_candy_1', 'src/img/bg_game_won_candy_1.jpg');
        this.game.load.image('bg_game_won_candy_2', 'src/img/bg_game_won_candy_2.jpg');
        this.game.load.image('bg_game_won_corn', 'src/img/bg_game_won_corn.jpg');
        this.game.load.image('bg_game_won_centipede', 'src/img/bg_game_won_centipede.jpg');

        // Foregrounds
        this.game.load.image('fg_level_0', 'src/img/fg_level_0.png');
        this.game.load.image('fg_level_1', 'src/img/fg_level_1.png');
        this.game.load.image('fg_level_2', 'src/img/fg_level_2.png');
        this.game.load.image('fg_level_3', 'src/img/fg_level_3.png');
        this.game.load.image('fg_level_4', 'src/img/fg_level_4.png');

        // Images
        this.game.load.image('circle_black', 'src/img/circle_black.png');

        // Audio
        this.game.load.audio('bg_ingame', ['src/audio/bg_ingame.mp3', 'src/audio/bg_ingame.ogg']);
        this.game.load.audio('fx_train_crash', ['src/audio/fx_train_crash.mp3', 'src/audio/fx_train_crash.ogg']);
    },
    create: function () {
        console.log('load.create');
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};
