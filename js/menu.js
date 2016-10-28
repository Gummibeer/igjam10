var menu = function (game) {
};

menu.prototype = {
    create: function () {
    },
    click: function () {
        this.game.state.clearCurrentState();
        this.game.state.start('Intro');
    }
};