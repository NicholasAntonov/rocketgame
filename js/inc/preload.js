define(['Phaser'], function () {


	function preload () {
		var game = app.game;

		game.load.image('icon', 'phaser.png');
		game.load.image('rocket', '/images/sprites/playerShip1_blue.png');
		game.load.image('small-star', '/images/sprites/Background/starSmall.png');
		game.load.image('big-star', '/images/sprites/Background/starBig.png');
		game.load.image('startButton', '/images/ui/blue_button00.png');
		game.load.image('meteor', '/images/sprites/Meteors/meteorBrown_big4.png');
	}

	return preload;
})