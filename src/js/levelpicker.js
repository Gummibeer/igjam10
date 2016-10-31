var levelpicker = function (game) {
};

levelpicker.prototype = {
    keys: {},
    levels: [],
    init: function () {
        console.log('levelpicker.init');
        this.keys = {};
        this.levels = [];
    },
    create: function () {
        console.log('levelpicker.create');

        this.levels = this.game.cache.getJSON('levels');

        this.game.stage.backgroundColor = '#c0c0c0';

        this.levels.forEach(function(level, index) {
            var xi = index % 4;
            var yi = Math.floor(index / 4);
            var p = 40;
            var w = 270;
            var h = 130;
            var x = p + ((w + p) * xi);
            var y = p + ((h + p) * yi);

            var box = game.add.graphics();
            box.beginFill(0x000000, 0.2);
            box.drawRect(x, y, w, h);
            box.inputEnabled = true;
            box.events.onInputDown.add(function() {
                console.log('clicked', level);
                game.state.clearCurrentState();
                game.state.start('Intro', true, false, level.config);
            });

            var style = {
                font: "bold 32px Arial",
                fill: "#fff",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };

            var text = game.add.text(0, 0, level.name, style);
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            text.setTextBounds(x, y, w, h);
        });

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
        this.keys.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update: function() {
        //console.log('levelpicker.update');
        if (this.keys.esc.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }
    }
};
