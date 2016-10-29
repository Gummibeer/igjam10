var Train = function () {

};

Train.prototype = {
    sprite: null,
    type: null,
    baseSpeed: null,
    speedMulti: 1,
    track: {
        sprites: [],
        coords: {
            x: [],
            y: []
        }
    },
    start: {},
    end: {},
    step: 0,
    arrived: false,
    init: function () {
        console.log('train.init');
        this.sprite = null;
        this.type = null;
        this.baseSpeed = null;
        this.speedMulti = 1;
        this.track = {
            sprites: [],
            coords: {
                x: [],
                y: [],
                a: []
            }
        };
        this.start = {};
        this.end = {};
        this.step = 0;
        this.waggons = [];
    },
    speed: function () {
        return this.baseSpeed * this.speedMulti;
    },
    move: function () {
        if(!this.arrived) {
            var grid = level.prototype.grid;
            var x = 1 / (this.track.sprites.length * grid);
            this.step = Math.min(this.step + (this.speed() * x), 1);
            this.moveSprite(this.sprite, this.step);
            this.waggons.forEach(function (waggon, i) {
                var waggonStep = Math.max(0, Math.min(this.step - (x * grid * (i + 1)), 1));
                this.moveSprite(waggon.sprite, waggonStep);
            }.bind(this));
            if (this.step == 1) {
                this.finish();
            }
        }
    },
    moveSprite: function (sprite, step) {
        sprite.position.x = game.math.catmullRomInterpolation(this.track.coords.x, step);
        sprite.position.y = game.math.catmullRomInterpolation(this.track.coords.y, step);
        sprite.rotation = game.math.catmullRomInterpolation(this.track.coords.a, step);
    },
    finish: function() {
        this.arrived = true;
        console.log('arrived', this);
    },
    onCollide: function(sprite1, sprite2) {
        console.log(sprite1, sprite2);
    }
};
