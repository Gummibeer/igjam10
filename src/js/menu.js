var menu = function (game) {
};

menu.prototype = {
    keys: {},
    create: function () {
        console.log('menu.create');
        this.game.add.image(0, 0, 'bg_menu');
        this.game.add.button(this.game.world.centerX - 160, this.game.world.centerY + 96, 'btn_start', this.click, this);

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.ENTER, Phaser.Keyboard.SPACEBAR]);
        this.keys.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    click: function () {
        console.log('menu.click');
        this.game.state.clearCurrentState();
        this.game.state.start('Intro');
    },
    update: function() {
        //console.log('menu.update');
        if (this.keys.enter.isDown || this.keys.space.isDown) {
            this.game.state.clearCurrentState();
            this.game.state.start('Intro');
            return true;
        }
    }
};
