var menu = function (game) {
};

menu.prototype = {
    create: function () {
        console.log('menu.preload');
    },
    click: function () {
        console.log('menu.preload');
        this.game.state.clearCurrentState();
        this.game.state.start('Intro');
    }
};