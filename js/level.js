var level = function (game) {
};

level.prototype = {
    name: null,
    config: {},
    keys: {},
    trains: [],
    grid: 32,
    groups: {},
    init: function (config) {
        console.log('level.init');
        this.name = config;
        this.config = {};
        this.keys = {};
        this.trains = [];
    },
    create: function () {
        console.log('level.create');
        this.config.level = this.game.cache.getJSON(this.name);
        this.config.trains = this.game.cache.getJSON('trains');

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
        this.keys.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        this.createTrains();
    },
    createTrains: function () {
        this.groups.trains = this.game.add.group();
        var data;
        for (var i = 0; i < this.config.level.trains.length; i++) {
            data = this.config.level.trains[i];
            this.trains[i] = this.createTrain(data);
        }
        this.game.world.bringToTop(this.groups.trains);
    },
    createTrain: function(data) {
        var train = new Train();
        train.init();
        train.type = data.type;
        train.baseSpeed = this.config.trains[train.type].speed;
        train.start.x = data.track[0][0] * this.grid;
        train.start.y = data.track[0][1] * this.grid;
        train.end.x = data.track[data.track.length - 1][0] * this.grid;
        train.end.y = data.track[data.track.length - 1][1] * this.grid;
        train.sprite = this.game.add.sprite(train.start.x, train.start.y, 'tex_train_'+this.config.trains[train.type].image);
        this.groups.trains.add(train.sprite);
        for (var i = 0; i < data.track.length; i++) {
            var track = data.track[i];
            var sprite = this.game.add.sprite(track[0] * this.grid, track[1] * this.grid, 'tex_rail_'+track[2]);
            switch(track[3]) {
                default:
                case 0:
                    sprite.anchor.setTo(0, 0);
                    break;
                case 90:
                    sprite.anchor.setTo(0, 1);
                    break;
                case 180:
                    sprite.anchor.setTo(1, 1);
                    break;
                case -90:
                case 270:
                    sprite.anchor.setTo(1, 0);
                    break;
            }
            sprite.angle = track[3];
            train.track.sprites.push(sprite);
            train.track.coords.x.push(sprite.position.x);
            train.track.coords.y.push(sprite.position.y);
        }
        return train;
    },
    update: function() {
        //console.log('level.update');
        if (this.keys.esc.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }

        this.trains.forEach(function(train) {
            train.move();
        });
    }
};