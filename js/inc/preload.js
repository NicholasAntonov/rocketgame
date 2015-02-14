define(['Phaser'], function () {


	function preload () {
		var game = app.game;

		game.load.image('icon', 'phaser.png');
		game.load.image('background', '/images/sprites/Background/backgroundColor.png');
	}

	return preload;
})