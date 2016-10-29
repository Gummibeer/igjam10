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
                y: []
            }
        };
        this.start = {};
        this.end = {};
        this.step = 0;
    },
    speed: function () {
        return this.baseSpeed * this.speedMulti;
    },
    move: function () {
        if(!this.arrived) {
            var x = 1 / (this.track.sprites.length * level.prototype.grid);
            this.step = Math.min(this.step + (this.speed() * x), 1);
            this.sprite.position.x = game.math.catmullRomInterpolation(this.track.coords.x, this.step);
            this.sprite.position.y = game.math.catmullRomInterpolation(this.track.coords.y, this.step);
            if (this.step == 1) {
                this.finish();
            }
        }
    },
    finish: function() {
        this.arrived = true;
        console.log('arrived', this);
    }
};