define(['Phaser'], function () {


	function preload () {
		var game = app.game;

		game.load.image('logo', 'phaser.png');
	}

	return preload;
})