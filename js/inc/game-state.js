define(['Phaser'], function (Phaser) {
	
	var gameState = function (game) {};

	gameState.prototype = {
		create : function () {
			var game = app.game;

			game.physics.startSystem(Phaser.Physics.P2JS);
		    game.physics.p2.defaultRestitution = 0.8;

			this.background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
	    	this.background.scale.setTo(8,6);
	    	this.background.anchor.setTo(0.5, 0.5);

		    this.meteor = game.add.sprite(0, 0, 'meteor');
		    game.physics.p2.enable(this.meteor);

		    this.rocket = game.add.sprite(game.world.centerX, game.world.centerY, 'rocket');
		    game.physics.p2.enable(this.rocket);
			

			game.camera.follow(this.rocket);

		    this.cursors = game.input.keyboard.createCursorKeys();

		    

		    game.camera.follow(this.rocket);

		},

		update : function () {
			var game = app.game;

			if (this.cursors.left.isDown)
		    {
				this.rocket.body.rotateLeft(100);
		    }
		    else if (this.cursors.right.isDown)
		    {
				this.rocket.body.rotateRight(100);
		    }
		    else
		    {
				this.rocket.body.setZeroRotation();
		    }

		    if (this.cursors.up.isDown)
		    {
		    	this.rocket.body.thrust(400);
		    }
		}
	}

	return gameState;
})