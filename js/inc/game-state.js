/*global define, app*/

define([
    'Phaser'
], function (
    Phaser
) {
	"use strict";
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
		return body1.body.mass * body2.body.mass / squaredDistance(body1, body2);

	}


	gameState.prototype = {
		create : function () {
            var game = app.game,
            	that = this,
            	currentStar,
                i,
                rocketShip,
                rocketFlare,

                // FIXME: Put these coords in a JSON file and load them

                rocketCollisionMaskPoints = [
                    -7, -38,
                    7, -38,
                    50, 0,
                    50, 30,
                    0, 38,
                    -50, 30,
                    -50, 0
                ],
                meteorCollisionMaskPoints = [
                    15, -48,
                    49, -15,
                    30, 43,
                    -25, 48,
                    -49, 10,
                    -40, -40
                ];

            // Set bounds has to be called before start system for collision with bounds
            game.world.setBounds(-1000, -1000, 2000, 2000);
            game.physics.startSystem(Phaser.Physics.P2JS);
            game.physics.p2.defaultRestitution = 0.8;

            game.stage.backgroundColor = '#5E3F6B';

            this.collectables = game.add.group();


            

            // FIXME: Give meteors their own function, so they can be added at will
            //        without repeating 4 lines of code for each meteor

            this.bodies = game.add.group();

            this.meteor = this.bodies.create(50, 50, 'meteor', app.debug);
            game.physics.p2.enable(this.meteor, app.debug);
            this.meteor.body.mass = 5000000;
            this.meteor.body.clearShapes();
            this.meteor.body.addPolygon(null, meteorCollisionMaskPoints.slice(0));

            this.meteor2 = this.bodies.create(250, 250, 'meteor', app.debug);
            game.physics.p2.enable(this.meteor2, app.debug);
            this.meteor2.body.mass = 5000000;
            this.meteor2.body.clearShapes();
            this.meteor2.body.addPolygon(null, meteorCollisionMaskPoints.slice(0));


            // The rocket!
            // FIXME: The rocket should probably have its own constructor as well,
            //        just to keep a consistent pattern (and keep it clean)

            rocketShip = game.add.sprite(350, 350, 'rocket', app.debug);
            rocketFlare = game.add.sprite(-7, 35, 'rocket-flare');
            rocketShip.addChild(rocketFlare);
            game.add.sprite(rocketShip);
            game.physics.p2.enable(rocketShip, app.debug, false);

            // Set the rocket to collide with meteors
            rocketShip.body.clearShapes();
            rocketShip.body.addPolygon(null, rocketCollisionMaskPoints);


            // Careful -- be sure to use this.rocket.ship instead of this.rocket when
            // referring to the physical body
            this.rocket = {
                ship: rocketShip,
                flare: rocketFlare
            };

            function pickUpStar(rocket, star) {
            	if (app.debug) {
            		console.log("star being picked up");
            	}
            	star.safeDestroy = true;
            }

            for (i = 0; i < 50; i += 1) {
                game.add.sprite(game.world.randomX, game.world.randomY, 'small-star');
                game.add.sprite(game.world.randomX, game.world.randomY, 'big-star');

                //currentStar = this.collectables.create(game.world.randomX, game.world.randomY, 'goldstar');
                currentStar = game.add.sprite(game.world.randomX, game.world.randomY, 'goldstar');
                game.physics.p2.enable(currentStar, app.debug);
                this.rocket.ship.body.createBodyCallback(currentStar, pickUpStar, that);
            }

            this.cursors = game.input.keyboard.createCursorKeys();

            game.physics.p2.setImpactEvents(true);

            game.camera.follow(this.rocket.ship);
        },

        update : function () {
            var game = app.game,
                that = this,
                largestForce,
                closestBody;

            this.bodies.forEachAlive(function (body) {
                var force = gravitationalForce(body, that.rocket.ship);

                if (closestBody === undefined || force > largestForce) {
                    largestForce = force;
                    closestBody = body;
                }
            }, this);

            accelerateToObject(this.rocket.ship, closestBody, largestForce);

            if (this.cursors.left.isDown) {
                this.rocket.ship.body.rotateLeft(100);
            } else if (this.cursors.right.isDown) {
                this.rocket.ship.body.rotateRight(100);
            } else {
                this.rocket.ship.body.setZeroRotation();
            }

            if (this.cursors.up.isDown) {
                this.rocket.ship.body.thrust(400);
                this.rocket.flare.visible = true;
            } else {
                this.rocket.flare.visible = false;
            }
        },

		render : function () {
			var game = app.game;

			if (app.debug) {
				game.debug.cameraInfo(game.camera, 32, 32);
    			game.debug.spriteCoords(this.rocket.ship, 32, 500);
			}
		}
	}
    return gameState;
});
