var gamewon = function (game) {
};

gamewon.prototype = {
    create: function () {
        console.log('gamewon.create');
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};