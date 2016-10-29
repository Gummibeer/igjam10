var level = function (game) {
};

level.prototype = {
    name: null,
    config: {},
    keys: {},
    trains: [],
    grid: 32,
    groups: {},
    background: null,
    foreground: null,
    init: function (config) {
        console.log('level.init');
        this.name = config;
        this.config = {};
        this.keys = {};
        this.trains = [];
        this.background = null;
        this.foreground = null;
    },
    create: function () {
        console.log('level.create');
        this.config.level = this.game.cache.getJSON(this.name);
        this.config.trains = this.game.cache.getJSON('trains');

        this.background = this.game.add.image(0, 0, this.config.level.backgroundImage);
        this.foreground = this.game.add.image(0, 0, this.config.level.foregroundImage);

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
        this.game.world.bringToTop(this.foreground);
    },
    createTrain: function(data) {
        var train = new Train();
        train.init();
        train.type = data.type;
        this.addWaggons(train, data);
        train.waggonLength = data.waggonLength;
        train.baseSpeed = this.config.trains[train.type].speed;
        train.start.x = data.track[data.waggonLength][0] * this.grid;
        train.start.y = data.track[data.waggonLength][1] * this.grid;
        train.end.x = data.track[data.track.length - 1][0] * this.grid;
        train.end.y = data.track[data.track.length - 1][1] * this.grid;
        train.sprite = this.game.add.sprite(train.start.x, train.start.y, 'tex_train_head_'+this.config.trains[train.type].image);
        train.sprite.anchor.setTo(0.5, 0.5);
        train.sprite.angle = data.startRotation;
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
            if(i > 1) {
                train.track.coords.a.push(this.game.math.angleBetweenPoints(train.track.sprites[train.track.sprites.length - 2], sprite.position));
            } else {
                train.track.coords.a.push(this.game.math.degToRad(data.startRotation));
            }
        }
        train.incStep(train.waggonLength);
        return train;
    },
    addWaggons: function (train, data) {
        for (var i = 0; i < data.waggonLength; i++) {
            var waggon = new TrainWaggon();
            var startPosition = {
                x: data.track[i][0] * this.grid,
                y: data.track[i][1] * this.grid
            };
            waggon.sprite = this.game.add.sprite(startPosition.x, startPosition.y, 'tex_train_body_'+this.config.trains[data.type].image);
            waggon.sprite.anchor.setTo(0.5, 0.5);
            waggon.sprite.angle = data.startRotation;
            train.waggons.push(waggon);
        }
    },
    checkCollisions: function () {
        var trains = this.trains;

        function isIntersecting(spriteA, spriteB) {
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();
            return Phaser.Rectangle.intersects(boundsA, boundsB);
        }

        function checkSpritesForCollision(spritesA, spritesB) {
            return spritesA.some(function (spriteA) {
                return spritesB.some(function (spriteB) {
                    if (isIntersecting(spriteA, spriteB)) {
                        return true;
                    }
                });
            });
        }

        for (var i = 0; i < trains.length -1; i++) {
            var spritesToCheck = trains[i].getAllSprites();
            for (var j = i+1; j < trains.length; j++) {
                if (checkSpritesForCollision(spritesToCheck, trains[j].getAllSprites())) {
                    trains[i].onCollide(trains[j]);
                    trains[j].onCollide(trains[i]);
                }
            }
        }
    },
    checkNextLevel: function () {
        var switchToNextLevel = this.trains.every(function (train) {
            return train.arrived;
        });
        if (switchToNextLevel) {
            var nextLevel = this.config.level.nextLevel;
            this.game.state.clearCurrentState();
            if (nextLevel) {
                this.game.state.start('Level', true, false, nextLevel);
            } else {
                this.game.state.start('GameWon');
            }
        }
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
        this.checkCollisions();
        this.checkNextLevel();
    }
};
