var ActionButton = function (options) {
    this.background = options.background;
    this.backgroundSprite = game.add.sprite(options.x, options.y, options.background);
    this.backgroundWhileDragging = options.backgroundWhileDragging;
    this.dragSprite = game.add.sprite(options.x, options.y, options.dragImage);
    this.isDragging = false;
    this.isSlowDown = options.isSlowDown;
    this.isSpeedUp = options.isSpeedUp;
    this.handleDropStop = options.handleDropStop;
    this.isDisabled = false;
};

ActionButton.prototype = {
    init: function () {
        this.dragSprite.inputEnabled = true;
        this.dragSprite.input.enableDrag({
            lockCenter: true
        });
        this.dragSprite.events.onDragStart.add(this.onDragStart, this);
        this.dragSprite.events.onDragStop.add(this.onDragStop, this);
        return this;
    },
    resetSpritePosition: function () {
        this.dragSprite.x = this.backgroundSprite.x;
        this.dragSprite.y = this.backgroundSprite.y;
    },
    onDragStart: function () {
        if (this.isDisabled) {
            return;
        }
        this.isDragging = true;
        this.backgroundSprite.loadTexture(this.backgroundWhileDragging);
        this.dragSprite.scale.setTo(0.5, 0.5);
        this.dragSprite.anchor.setTo(-0.5);
        game.canvas.style.cursor = "none";
        console.log('dragStart');
    },
    onDragStop: function () {
        if (this.isDisabled) {
            return;
        }
        console.log('dragStop', this);
        this.backgroundSprite.loadTexture(this.background);
        this.dragSprite.scale.setTo(1, 1);
        this.dragSprite.anchor.setTo(0);
        this.handleDropStop();
        this.isDragging = false;
        game.canvas.style.cursor = "default";
        this.resetSpritePosition();
    },
    disable: function () {
        this.isDisabled = true;
        this.backgroundSprite.loadTexture(this.backgroundWhileDragging);
        this.dragSprite.inputEnabled = false;
    }
};
