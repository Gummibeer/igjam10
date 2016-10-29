var ActionButton = function (options) {
    this.backgroundSprite = game.add.sprite(options.x, options.y, options.background);
    this.dragSprite = game.add.sprite(options.x, options.y, options.background);
    this.isDragged = false;
    this.isSlowDown = options.isSlowDown;
    this.isSpeedUp = options.isSpeedUp;
};

ActionButton.prototype = {
    init: function () {
        this.dragSprite.inputEnabled = true;
        this.dragSprite.input.enableDrag();
        this.dragSprite.events.onDragStart.add(this.onDragStart, this);
        this.dragSprite.events.onDragStop.add(this.onDragStop, this);
        return this;
    },
    resetSpritePosition: function () {
        this.dragSprite.x = this.backgroundSprite.x;
        this.dragSprite.y = this.backgroundSprite.y;
    },
    onDragStart: function () {
        this.isDragged = true;
        this.dragSprite.alpha = 0.2;
        console.log('dragStart', this);
    },
    onDragStop: function () {
        this.isDragged = false;
        this.dragSprite.alpha = 1;
        console.log('dragStop', this);
        this.resetSpritePosition();
    }
};
