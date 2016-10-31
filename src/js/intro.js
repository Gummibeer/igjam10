var intro = function (game) {
};

intro.prototype = {
    config: null,
    init: function (config) {
        console.log('intro.init');
        this.config = config;
    },
    create: function () {
        console.log('intro.create');
        this.game.add.image(0, 0, 'bg_intro');
        if(!this.game.displayTutorial) {
            this.game.state.clearCurrentState();
            this.game.state.start('Level', true, false, this.config);
        }
    },
    update: function() {
        //console.log('intro.update');

        function onInput() {
            game.state.clearCurrentState();
            game.state.start('Level', true, false, this.config);
        }

        this.game.input.keyboard.onDownCallback = onInput.bind(this);
        this.game.input.onDown.add(onInput.bind(this));
    },
    shutdown: function() {
        this.game.displayTutorial = false;
        this.game.input.keyboard.onDownCallback = null;
        this.game.input.onDown.removeAll();
    }
};
