'use strict';

if (typeof(Storage) !== "undefined") {
    localStorage.setItem('level-0-unlocked', true);

    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'stage', {});

    game.state.add('Boot', boot);
    game.state.add('Load', load);
    game.state.add('Menu', menu);
    game.state.add('LevelPicker', levelpicker);
    game.state.add('Intro', intro);
    game.state.add('Level', level);
    game.state.add('Swap', swap);

    game.state.add('GameWon', gamewon);
    game.state.add('GameOver', gameover);

    game.state.start('Boot');
} else {
    document.getElementById('stage').innerText = 'Your browser does not support local-storage - the game does not work without.';
}
