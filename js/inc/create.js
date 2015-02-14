define(['Phaser'], function () {
	

	function create () {
		var game = app.game;
		
	    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
	    logo.anchor.setTo(0.5, 0.5);

    }

	return create;
})