var gameover = function (game) {
};

gameover.prototype = {
    create: function () {
        console.log('gameover.create');
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};