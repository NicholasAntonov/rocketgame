define(['Phaser', 'inc/game-state'], function (Phaser, gameState) {
	

	function create () {
		var game = app.game,
			background,
			icon;

		game.physics.startSystem(Phaser.Physics.P2JS);
		
	    background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
	    background.scale.setTo(8,6);
	    background.anchor.setTo(0.5, 0.5);



	    game.state.add('play', gameState);
	    game.state.start('play', true, false);
	    

    }

	return create;
})