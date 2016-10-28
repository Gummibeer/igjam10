var level = function (game) {
};

level.prototype = {
    config: null,
    init: function (config) {
        console.log('level.init');
        this.config = config;
    },
    create: function () {
        console.log('level.create');
        this.config = this.game.cache.getJSON(this.config);
    },
    update: function() {
        console.log('level.update');
    }
};