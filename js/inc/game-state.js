define(['Phaser'], function () {
	
	var gameState = function (game) {};

	gameState.prototype = {
		create : function () {
			var game = app.game;

			icon = game.add.sprite(game.world.centerX, game.world.centerY, 'icon');
		    icon.anchor.setTo(0.5,0.5);
		}
	}

	return gameState;
})