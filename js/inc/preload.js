define(['Phaser'], function () {


	function preload () {
		var game = app.game;

		game.load.image('icon', 'phaser.png');
		game.load.image('rocket', '/images/sprites/playerShip1_blue.png');
		game.load.image('meteor', '/images/sprites/Meteors/meteorBrown_big4.png');
	}

	return preload;
})