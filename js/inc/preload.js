/*global define, app*/

define(['Phaser'], function () {
    'use strict';

    function preload() {
        var game = app.game;

        game.load.image('icon', 'phaser.png');
        game.load.image('rocket', '/rocketgame/images/sprites/playerShip1_blue.png');
        game.load.image('rocket-flare', '/rocketgame/images/sprites/Effects/fire06.png');
        game.load.image('small-star', '/rocketgame/images/sprites/Background/starSmall.png');
        game.load.image('big-star', '/rocketgame/images/sprites/Background/starBig.png');
        game.load.image('startButton', '/rocketgame/images/ui/blue_button00.png');
        game.load.image('meteor', '/rocketgame/images/sprites/Meteors/meteorBrown_big4.png');
        game.load.image('goldstar', '/rocketgame/images/platformerpack/Base pack/Items/star.png');
    }

    return preload;
});
