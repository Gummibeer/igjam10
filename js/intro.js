var intro = function (game) {
};

intro.prototype = {
    create: function () {
        console.log('intro.create');
        this.game.add.image(0, 0, 'bg_intro');
        if(!this.game.displayTutorial) {
            this.game.state.clearCurrentState();
            this.game.state.start('Level', true, false, 'level-0');
        }
    },
    update: function() {
        //console.log('intro.update');

        function onInput() {
            game.state.clearCurrentState();
            game.state.start('Level', true, false, 'level-0');
        }

        this.game.input.keyboard.onDownCallback = onInput;
        this.game.input.onDown.add(onInput);
    },
    shutdown: function() {
        this.game.displayTutorial = false;
        this.game.input.keyboard.onDownCallback = null;
        this.game.input.onDown.removeAll();
    }
};
