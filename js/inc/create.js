define(['Phaser'], function () {
	

	function create () {
		var game = app.game,
			background,
			icon;
		
	    background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
	    background.scale.setTo(8,6);
	    background.anchor.setTo(0.5, 0.5);

	    icon = game.add.sprite(game.world.centerX, game.world.centerY, 'icon');
	    icon.anchor.setTo(0.5,0.5);
	    
    }

	return create;
})