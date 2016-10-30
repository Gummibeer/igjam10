var gameover = function (game) {
};

gameover.prototype = {
    images: [
        'bg_game_over_cemetery',
        'bg_game_over_coffin',
        'bg_game_over_skull'
    ],
    create: function () {
        console.log('gameover.create');
        var image = this.images[Math.round(Math.random() * (this.images.length - 1))];
        this.game.add.image(0, 0, image);
    },
    update: function() {
        //console.log('gameover.update');
        this.game.input.onDown.add(function() {
            this.game.state.clearCurrentState();
            this.game.state.start('Menu');
        }.bind(this));
    }
};