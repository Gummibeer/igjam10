var menu = function (game) {
};

menu.prototype = {
    create: function () {
        console.log('menu.create');
    },
    click: function () {
        console.log('menu.click');
        this.game.state.clearCurrentState();
        this.game.state.start('Intro');
    }
};