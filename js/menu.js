var menu = function (game) {
};

menu.prototype = {
    create: function () {
        console.log('menu.create');
        this.game.add.button(0, 0, 'btn-start', this.click, this);
    },
    click: function () {
        console.log('menu.click');
        this.game.state.clearCurrentState();
        this.game.state.start('Intro');
    }
};
