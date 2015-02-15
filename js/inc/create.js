define(['Phaser', 'inc/game-state'], function (Phaser, gameState) {
	

	function create () {
		var game = app.game,
			background,
			icon;



	    game.state.add('play', gameState);
	    game.state.start('play', true, false);
	    

    }

	return create;
})