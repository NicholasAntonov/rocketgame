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

	function squaredDistance(body1, body2) {
		return Math.pow(body1.body.x - body2.body.x, 2) + Math.pow(body1.body.y - body2.body.y, 2);
	}

	function gravitationalForce (body1, body2) {
		var G = 6.674e-11;
		return 5000000 * body1.body.mass * body2.body.mass / squaredDistance(body1, body2);

	}


	gameState.prototype = {
		create : function () {
			var game = app.game;

			game.physics.startSystem(Phaser.Physics.P2JS);
		    game.physics.p2.defaultRestitution = 0.8;

		    game.stage.backgroundColor = '#5E3F6B';

		    game.world.setBounds(-1000, -1000, 2000, 2000);



		    for (var i = 0; i < 200; i++)
		    {
		        game.add.sprite(game.world.randomX, game.world.randomY, 'mushroom');
		    }
	    	// this.bodies
	    	this.bodies = game.add.group();

		    	this.meteor = this.bodies.create(50, 50, 'meteor');
		    	game.physics.p2.enable(this.meteor);
		    	this.meteor2 = this.bodies.create(250, 250, 'meteor');
		    	game.physics.p2.enable(this.meteor2);

		    this.rocket = game.add.sprite(game.world.centerX, game.world.centerY, 'rocket');
		    game.physics.p2.enable(this.rocket);
			

			game.camera.follow(this.rocket);

		    this.cursors = game.input.keyboard.createCursorKeys();

		    

		    game.camera.follow(this.rocket);

		},

		update : function () {
			var game = app.game,
				that = this,
				largestForce,
				closestBody;

			this.bodies.forEachAlive(function (body) {
				var force = gravitationalForce(body, that.rocket) ;

				if (closestBody === undefined || force > largestForce) {
					largestForce = force;
					closestBody = body;
				}
			}, this);

			accelerateToObject(this.rocket, closestBody, largestForce);

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