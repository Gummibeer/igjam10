var intro = function (game) {
};

intro.prototype = {
    create: function () {
        console.log('intro.create');
        if(!this.game.displayTutorial) {
            this.game.state.clearCurrentState();
            this.game.state.start('Level', true, false, 'level-1');
        }
    },
    update: function() {
        //console.log('intro.update');

        function onInput() {
            game.displayTutorial = false;
            game.input.keyboard.onDownCallback = null;
            game.input.onDown.removeAll();
            game.state.clearCurrentState();
            game.state.start('Level', true, false, 'level-1');
        }

        this.game.input.keyboard.onDownCallback = onInput;
        this.game.input.onDown.add(onInput);
    }
};