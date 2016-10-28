var level = function (game) {
};

level.prototype = {
    preload: function () {
        console.log('level.preload');
    },
    create: function () {
        console.log('level.create');
    },
    update: function() {
        console.log('level.update');
    }
};