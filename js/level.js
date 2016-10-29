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
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

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
        this.addWaggons(train, data);
        train.waggonLength = data.waggonLength;
        train.baseSpeed = this.config.trains[train.type].speed;
        train.start.x = data.track[train.waggonLength][0] * this.grid;
        train.start.y = data.track[train.waggonLength][1] * this.grid;
        train.end.x = data.track[data.track.length - 1][0] * this.grid;
        train.end.y = data.track[data.track.length - 1][1] * this.grid;
        train.sprite = this.game.add.sprite(train.start.x, train.start.y, 'tex_train_'+this.config.trains[train.type].image);

        train.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable([train.sprite].concat(train.waggons.map(function (waggon) {
            return waggon.sprite;
        })));
        train.sprite.body.onCollide = new Phaser.Signal();
        train.sprite.body.onCollide.add(train.onCollide);
        this.groups.trains.add(train.sprite);
        train.waggons.forEach(function (waggon) {
            this.groups.trains.add(waggon.sprite);
        }.bind(this));
        for (var i = 0; i < data.track.length; i++) {
            var track = data.track[i];
            var sprite = this.game.add.sprite(track[0] * this.grid + (this.grid / 2), track[1] * this.grid + (this.grid / 2), 'tex_rail_'+track[2]);
            sprite.anchor.setTo(0.5, 0.5);
            sprite.angle = track[3];
            train.track.sprites.push(sprite);
            train.track.coords.x.push(sprite.position.x);
            train.track.coords.y.push(sprite.position.y);
            if(i > 0) {
                train.track.coords.a.push(this.game.math.angleBetweenPoints(train.track.sprites[train.track.sprites.length - 2], sprite.position));
            } else {
                train.track.coords.a.push(0);
            }
        }
        return train;
    },
    addWaggons: function (train, data) {
        for (var i = data.waggonLength - 1; i >= 0; i--) {
            var waggon = new TrainWaggon();
            var startPosition = {
                x: data.track[data.waggonLength - i][0] * this.grid,
                y: data.track[data.waggonLength - i][1] * this.grid
            };
            waggon.sprite = this.game.add.sprite(startPosition.x, startPosition.y, 'tex_train_'+this.config.trains[data.type].image);
            waggon.sprite.anchor.setTo(0.5, 0.5);
            train.waggons.push(waggon);
        }
    },
    update: function() {
        //console.log('level.update');
        if (this.keys.esc.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }

        this.game.physics.arcade.collide(this.groups.trains);

        this.trains.forEach(function(train) {
            train.move();
        });
    },
    render: function() {
        this.trains.forEach(function(train) {
            this.game.debug.body(train.sprite);
            train.waggons.forEach(function (waggon) {
                this.game.debug.body(waggon.sprite);
            }.bind(this))
        });
    }
};
