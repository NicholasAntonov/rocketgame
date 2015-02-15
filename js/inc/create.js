define(['Phaser', 'inc/game-state', 'inc/menu-state'], function (Phaser, gameState, menuState) {
	

	function create () {
		var game = app.game,
			background,
			icon;


	    game.state.add('play', gameState);
	    game.state.add('menu', menuState);
	    game.state.start('menu', true, false);
	    

    }

	return create;
})