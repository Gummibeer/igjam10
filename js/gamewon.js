var gamewon = function (game) {
};

gamewon.prototype = {
    images: [
        'bg_game_won_candy_1',
        'bg_game_won_candy_2',
        'bg_game_won_corn'
    ],
    create: function () {
        console.log('gamewon.create');
        var image = this.images[Math.round(Math.random() * (this.images.length - 1))];
        this.game.add.image(0, 0, image);
    },
    update: function() {
        //console.log('gamewon.update');

        function onInput() {
            game.state.clearCurrentState();
            game.state.start('Menu');
        }

        this.game.input.keyboard.onDownCallback = onInput;
        this.game.input.onDown.add(onInput);
    },
    shutdown: function() {
        this.game.input.keyboard.onDownCallback = null;
        this.game.input.onDown.removeAll();
    }
};