var level = function (game) {
};

level.prototype = {
    name: null,
    config: {},
    keys: {},
    trains: [],
    grid: 32,
    groups: {},
    actionButtons: [],
    background: null,
    foreground: null,
    active: false,
    circleBlack: null,
    speedUp: null,
    slowDown: null,
    music: null,
    init: function (config) {
        console.log('level.init');
        this.name = config;
        this.config = {};
        this.keys = {};
        this.trains = [];
        this.actionButtons = [];
        this.speedUp = null;
        this.slowDown = null;
        this.background = null;
        this.foreground = null;
    },
    create: function () {
        console.log('level.create');
        this.config.level = this.game.cache.getJSON(this.name);
        this.config.trains = this.game.cache.getJSON('trains');

        this.background = this.game.add.image(0, 0, this.config.level.backgroundImage);
        this.foreground = this.game.add.image(0, 0, this.config.level.foregroundImage);

        this.music = this.game.add.audio('bg_ingame');
        this.music.loopFull();
        this.music.play();

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
        this.keys.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        this.createTrains();
        this.createActionButtons();

        this.circleBlack = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'circle_black');
        this.circleBlack.anchor.setTo(0.5, 0.5);
        this.circleBlack.scale.x = 3.5;
        this.circleBlack.scale.y = 3.5;
        var tween = this.game.add.tween(this.circleBlack.scale).to({x:0, y:0}, 2000, Phaser.Easing.Exponential.Out);
        tween.onComplete.add(function() {
            this.active = true;
        }.bind(this));
        this.game.world.bringToTop(this.groups.trains);
        this.game.world.bringToTop(this.foreground);
        this.game.world.bringToTop(this.groups.ui);
        this.game.world.bringToTop(this.circleBlack);
        tween.start();
    },
    createTrains: function () {
        this.groups.trains = this.game.add.group();
        var data;
        for (var i = 0; i < this.config.level.trains.length; i++) {
            data = this.config.level.trains[i];
            this.trains[i] = this.createTrain(data);
        }
    },
    createTrain: function(data) {
        var train = new Train();
        train.init();
        train.type = data.type;
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
        this.addWaggons(train, data);
        train.waggonLength = data.waggonLength;
        train.baseSpeed = this.config.trains[train.type].speed;
        train.start.x = train.track.coords.x[data.waggonLength];
        train.start.y = train.track.coords.y[data.waggonLength];
        train.end.x = train.track.coords.x[data.track.length - 1];
        train.end.y = train.track.coords.y[data.track.length - 1];
        train.sprite = this.game.add.sprite(train.start.x, train.start.y, 'tex_train_head_'+this.config.trains[train.type].image);
        train.sprite.anchor.setTo(0.5, 0.5);
        train.sprite.angle = data.startRotation;
        this.groups.trains.add(train.sprite);
        train.waggons.forEach(function (waggon) {
            this.groups.trains.add(waggon.sprite);
        }.bind(this));
        train.incStep(train.waggonLength);
        return train;
    },
    addWaggons: function (train, data) {
        for (var i = 0; i < data.waggonLength; i++) {
            var waggon = new TrainWaggon();
            var startPosition = {
                x: data.track[data.waggonLength - 1 - i][0] * this.grid + (this.grid / 2),
                y: data.track[data.waggonLength - 1 - i][1] * this.grid + (this.grid / 2)
            };
            var image = 'tex_train_body_'+this.config.trains[data.type].image;
            if(i == data.waggonLength - 1) {
                image = 'tex_train_tail_'+this.config.trains[data.type].image;
            }
            waggon.sprite = this.game.add.sprite(startPosition.x, startPosition.y, image);
            waggon.sprite.anchor.setTo(0.5, 0.5);
            waggon.sprite.angle = data.startRotation;
            train.waggons.push(waggon);
        }
    },
    getAllTrackSprites: function () {
        return this.trains.reduce(function (allTracks, train) {
            return allTracks.concat(train.track.sprites)
        }, []);
    },
    createActionButtons: function () {
        var self = this;
        this.groups.ui = this.game.add.group();

        var timeAcceleratorButton = new ActionButton({
            background: 'btn_speed_up',
            isSpeedUp: true,
            x: this.game.world.width - 95 - 20,
            y: 20,
            handleDropStop: function () {
                var hoveredTrack = this.hoveredTrack;
                if (hoveredTrack) {
                    self.speedUp = game.add.sprite(hoveredTrack.x, hoveredTrack.y, 'accelerator');
                    self.speedUp.anchor.setTo(0.5);
                    this.disable();
                }
            }
        });
        timeAcceleratorButton.init();
        this.groups.ui.add(timeAcceleratorButton.backgroundSprite);

        var timeDeceleratorButton = new ActionButton({
            background: 'btn_slow_down',
            isSlowDown: true,
            x: this.game.world.width - 95 - 20 - 95 - 20,
            y: 20,
            handleDropStop: function () {
                var hoveredTrack = this.hoveredTrack;
                if (hoveredTrack) {
                    self.slowDown = game.add.sprite(hoveredTrack.x, hoveredTrack.y, 'decelerator');
                    self.slowDown.anchor.setTo(0.5);
                    this.disable();
                }
            }
        });
        timeDeceleratorButton.init();
        this.groups.ui.add(timeDeceleratorButton.backgroundSprite);

        this.actionButtons = [timeAcceleratorButton, timeDeceleratorButton];
    },
    checkTrainCollisions: function () {
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
    getDraggedButton: function () {
        return this.actionButtons.reduce(function (activeButton, button) {
            if (button.isDragging) {
                activeButton = button;
            }
            return activeButton;
        });
    },
    getNearestTrackSpriteThatIntersectsBoundaries: function (boundaries) {
        var intersectingTracks = this.getAllTrackSprites().filter(function (trackSprite) {
            if (Phaser.Rectangle.intersects(boundaries, trackSprite.getBounds())) {
                return trackSprite;
            }
        });
        if (!intersectingTracks.length) {
            return;
        }
        var centerOfBoundaries = boundaries.getPoint(Phaser.CENTER);
        var intersectingTracksByDistance = intersectingTracks.map(function (track) {
            var trackCenter = track.getBounds().getPoint(Phaser.CENTER);
            var distance = Math.sqrt(Math.pow(Math.abs(trackCenter.x - centerOfBoundaries.x),2) + Math.pow(Math.abs(trackCenter.y - centerOfBoundaries.y), 2));
            return {
                track: track,
                distance: distance
            };
        });
        function byDistance(a, b) {
            return a.distance - b.distance;
        }
        return intersectingTracksByDistance.sort(byDistance)[0].track;

    },
    checkIsActionButtonOverTrack: function () {
        var draggedButton = this.getDraggedButton();
        if (!draggedButton || !draggedButton.dragSprite._bounds) {
            return;
        }
        draggedButton.hoveredTrack = null;
        if (draggedButton.isSlowDown && this.slowDown) {
            return;
        }
        if (draggedButton.isSpeedUp && this.speedUp) {
            return;
        }

        var buttonBoundaries = draggedButton.dragSprite.getBounds();
        var intersectingTrack = this.getNearestTrackSpriteThatIntersectsBoundaries(buttonBoundaries);

        if (intersectingTrack) {
            draggedButton.hoveredTrack = intersectingTrack;
        }
    },
    checkNextLevel: function () {
        var allArrived = this.trains.every(function (train) {
            return train.arrived;
        });
        var someDestroyed = this.trains.some(function (train) {
            return train.destroyed;
        });
        var tween = this.game.add.tween(this.circleBlack.scale).to({x:3.5, y:3.5}, 1000, Phaser.Easing.Exponential.Out);
        if (allArrived) {
            this.active = false;
            var nextLevel = this.config.level.nextLevel;
            if (nextLevel) {
                tween.onComplete.add(function() {
                    this.game.state.clearCurrentState();
                    this.game.state.start('Level', true, false, nextLevel);
                }.bind(this));
            } else {
                tween.onComplete.add(function() {
                    this.game.state.clearCurrentState();
                    this.game.state.start('GameWon');
                }.bind(this));
            }
            this.music.stop();
            tween.start();
        } else if(someDestroyed) {
            this.active = false;
            tween.onComplete.add(function() {
                this.game.state.clearCurrentState();
                this.game.state.start('GameOver');
            }.bind(this));
            this.music.stop();
            tween.start();
        }
    },
    checkCollisionWithSpeedUp: function () {
        if (!this.speedUp && !this.slowDown) {
            return;
        }
        function isTrainIntersectingWith(sprite) {
            var spriteBoundaries = sprite.getBounds();
            return function (train) {
                return train.getAllSprites().some(function (trainSegmentSprite) {
                    var trainSegmentBoundaries = trainSegmentSprite.getBounds();
                    return Phaser.Rectangle.intersects(spriteBoundaries, trainSegmentBoundaries);
                })
            }
        }

        var trainsToSpeedUp = this.speedUp ? this.trains.filter(isTrainIntersectingWith(this.speedUp)) : [];
        var trainsToSlowDown = this.slowDown ? this.trains.filter(isTrainIntersectingWith(this.slowDown)) : [];
        this.trains.forEach(function (train) {
            train.speedMulti = 1;
            if (trainsToSpeedUp.indexOf(train) > -1) {
                train.speedMulti += 1;
            }
            if (trainsToSlowDown.indexOf(train) > -1) {
                train.speedMulti /= 2;
            }
        });
    },
    update: function() {
        //console.log('level.update');
        if (this.keys.esc.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
            return true;
        }

        if(this.active) {
            this.checkCollisionWithSpeedUp();
            this.trains.forEach(function (train) {
                train.move();
            });
            this.checkTrainCollisions();
            this.checkIsActionButtonOverTrack();
            this.game.world.bringToTop(this.groups.trains);
            this.game.world.bringToTop(this.foreground);
            this.game.world.bringToTop(this.groups.ui);
            this.checkNextLevel();
        }
        this.game.world.bringToTop(this.circleBlack);
    },
    shutdown: function() {
        this.music.destroy();
    }
};
