var level = function (game) {
};

level.prototype = {
    config: null,
    keys: {},
    init: function (config) {
        console.log('level.init');
        this.config = config;
        this.keys = {};
    },
    create: function () {
        console.log('level.create');
        this.config = this.game.cache.getJSON(this.config);

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
        this.keys.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update: function() {
        console.log('level.update');
        if (this.keys.esc.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }
    }
};