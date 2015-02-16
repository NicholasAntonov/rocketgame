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

    function pickUpStar(rocket, star) {
        app.score += 10;
        app.scoreText.text = 'score: ' + app.score;
        star.safeDestroy = true;
    }


	gameState.prototype = {
		create : function () {
            var game = app.game,
            	that = this,
            	currentStar,
                i,
                rocketShip,
                rocketFlare,
                currentMeteor,

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
                ],
                starCollisionMaskPoints = [
                    0, -15,
                    15, -4,
                    10, 20,
                    -10, 20,
                    -15, -4
                ];

            // Set bounds has to be called before start system for collision with bounds
            game.world.setBounds(-1000, -1000, 2000, 2000);
            game.physics.startSystem(Phaser.Physics.P2JS);
            game.physics.p2.defaultRestitution = 0.8;

            game.stage.backgroundColor = '#5E3F6B';

            this.collectables = game.add.group();


            for (i = 0; i < 50; i += 1) {
                game.add.sprite(game.world.randomX, game.world.randomY, 'small-star');
                game.add.sprite(game.world.randomX, game.world.randomY, 'big-star');
            }
            // FIXME: Give meteors their own function, so they can be added at will
            //        without repeating 4 lines of code for each meteor

            this.bodies = game.add.group();

            for (i = 0; i < 10; i += 1) {
                currentMeteor = this.bodies.create(game.world.randomX, game.world.randomY, 'meteor');
                game.physics.p2.enable(currentMeteor, app.debug);
                currentMeteor.body.mass = 5000000;
                currentMeteor.body.clearShapes();
                currentMeteor.body.addPolygon(null, meteorCollisionMaskPoints.slice(0));
            }


            // The rocket!
            // FIXME: The rocket should probably have its own constructor as well,
            //        just to keep a consistent pattern (and keep it clean)

            rocketShip = game.add.sprite(350, 350, 'rocket');
            rocketFlare = game.add.sprite(-7, 35, 'rocket-flare');
            rocketShip.addChild(rocketFlare);
            game.add.sprite(rocketShip);
            game.physics.p2.enable(rocketShip, app.debug, false);

            // Set the rocket to collide with meteors
            rocketShip.body.clearShapes();
            rocketShip.body.addPolygon(null, rocketCollisionMaskPoints.slice(0));


            // Careful -- be sure to use this.rocket.ship instead of this.rocket when
            // referring to the physical body
            this.rocket = {
                ship: rocketShip,
                flare: rocketFlare
            };


            for (i = 0; i < 50; i += 1) {

                //currentStar = this.collectables.create(game.world.randomX, game.world.randomY, 'goldstar');
                currentStar = game.add.sprite(game.world.randomX, game.world.randomY, 'goldstar', undefined, this.collectables);
                game.physics.p2.enable(currentStar, app.debug);
                currentStar.body.clearShapes();
                currentStar.body.addPolygon(null, starCollisionMaskPoints.slice(0));
                currentStar.body.mass = 0.0001;

                this.rocket.ship.body.createBodyCallback(currentStar, pickUpStar, that);
            }

            this.cursors = game.input.keyboard.createCursorKeys();

            game.physics.p2.setImpactEvents(true);

            game.camera.follow(this.rocket.ship);

            app.scoreText = game.add.text(32, 50, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
            app.scoreText.fixedToCamera = true;
            app.score = 0;

            app.fuel = 1000;
            app.fuelText = game.add.text(32, 550, 'fuel: ' + app.fuel, { font: "20px Arial", fill: "#ffffff", align: "left" });
            app.fuelText.fixedToCamera = true;
            
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

            this.collectables.forEachAlive(function (sprite) {
                if (sprite.body.safeDestroy === true) {
                    sprite.kill();
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
                app.fuel -= 1;
            	app.fuelText.text = 'fuel: ' + app.fuel;
                this.rocket.flare.visible = true;
            } else {
                this.rocket.flare.visible = false;
            }

            if (app.fuel < 0) {
            	game.state.start('end', true, false);
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
