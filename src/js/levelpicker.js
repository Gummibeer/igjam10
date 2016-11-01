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

        this.game.add.image(0, 0, 'bg_level_picker');

        var col = 4;
        var p = 40;
        var w = ((game.world.width - (p * 2)) / col) - p;
        var h = ((game.world.height - (p * 2)) / Math.max(Math.ceil(this.levels.length / col), 4)) - p;
        this.levels.forEach(function(level, index) {
            var unlocked = JSON.parse(localStorage.getItem(level.config+'-unlocked'));
            var finished = JSON.parse(localStorage.getItem(level.config+'-finished'));

            var xi = index % col;
            var yi = Math.floor(index / col);
            var x = p + ((w + p) * xi);
            var y = p + ((h + p) * yi);

            var img = game.add.sprite(x, y, 'bg_intro');
            img.anchor.setTo(0, 0);
            var rect = new Phaser.Rectangle(0, 0, w, h);
            img.crop(rect);

            var box = game.add.graphics();
            box.beginFill(0x000000, 1);
            if(unlocked) {
                box.beginFill(0x000000, 0.5);
                if(finished) {
                    box.beginFill(0xffffff, 0);
                }
                box.inputEnabled = true;
                box.input.useHandCursor = true;
                box.events.onInputDown.add(function() {
                    console.log('clicked', level);
                    game.state.clearCurrentState();
                    game.state.start('Intro', true, false, level.config);
                });
            }
            box.drawRect(x, y, w, h);
            box.endFill();

            var text = game.add.text(0, 0, level.name, {
                font: "32px Coiny",
                fill: "#ffffff",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            text.setTextBounds(x, y, w, h / 2);
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

            var icon = '';
            var color = '#ffffff';
            if(unlocked) {
                icon = '';
                color = '#ffffff';
                if(finished) {
                    icon = level.icon;
                    color = '#f0c419';
                }
            }
            icon = game.add.text(0, 0, icon+' ', {
                font: "32px FontAwesome",
                fill: color,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            icon.setTextBounds(x, y + h / 2, w, h / 2);
            icon.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
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
