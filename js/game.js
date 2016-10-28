'use strict';

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gj2016', {
  create: create,
  render: render
});


function create() {
  game.stage.backgroundColor = '#124184';

  game.physics.startSystem(Phaser.Physics.BOX2D);

}

function render() {
}
