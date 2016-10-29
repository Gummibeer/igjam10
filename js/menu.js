var menu = function (game) {
};

menu.prototype = {
    create: function () {
        console.log('menu.create');
        this.game.add.image(0, 0, 'bg_menu');
        this.game.add.button(this.game.world.centerX - 160, this.game.world.centerY + 96, 'btn_start', this.click, this);
    },
    click: function () {
        console.log('menu.click');
        this.game.state.clearCurrentState();
        this.game.state.start('Intro');
    }
};
