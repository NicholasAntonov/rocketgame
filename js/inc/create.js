define(['Phaser', 'inc/game-state', 'inc/menu-state', 'inc/end-state'], function (Phaser, gameState, menuState, endState) {
	

	function create () {
		var game = app.game,
			background,
			icon;


	    game.state.add('play', gameState);
	    game.state.add('menu', menuState);
	    game.state.add('end', endState);
	    game.state.start('menu', true, false);
	    

    }

	return create;
})