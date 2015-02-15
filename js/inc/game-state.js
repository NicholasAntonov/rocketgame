define([
	'Phaser'
], function (
	Phaser
) {
	
	var gameState = function (game) {};

	function accelerateToObject (obj1, obj2, speed) {
		if (typeof speed === 'undefined') { speed = 60; }
		var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
		obj1.body.force.x = Math.cos(angle) * speed;
		obj1.body.force.y = Math.sin(angle) * speed;
	}


	gameState.prototype = {
		create : function () {
			var game = app.game,
				bodies;

			game.physics.startSystem(Phaser.Physics.P2JS);
		    game.physics.p2.defaultRestitution = 0.8;

			this.background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
	    	this.background.scale.setTo(8,6);
	    	this.background.anchor.setTo(0.5, 0.5);


	    	// Bodies
	    	bodies = game.add.group();

		    	this.meteor = bodies.create(50, 50, 'meteor');
		    	game.physics.p2.enable(this.meteor);
		    	this.meteor2 = bodies.create(250, 250, 'meteor');
		    	game.physics.p2.enable(this.meteor2);

		    this.rocket = game.add.sprite(game.world.centerX, game.world.centerY, 'rocket');
		    game.physics.p2.enable(this.rocket);
			

			game.camera.follow(this.rocket);

		    this.cursors = game.input.keyboard.createCursorKeys();

		    

		    game.camera.follow(this.rocket);

		},

		update : function () {
			var game = app.game,
				closestBody;



			accelerateToObject(this.rocket, this.meteor);

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