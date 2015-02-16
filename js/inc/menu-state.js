define(['Phaser'], function (Phaser) {

	var menuState = function(game){};

	menuState.prototype = {
		create : function () {
			var game = app.game;

			game.stage.backgroundColor = '#5E3F6B';

			this.icon = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'icon');
		    this.icon.anchor.setTo(0.5,0.5);

		    this.button = game.add.button(game.world.centerX, game.world.centerY + 100, 'startButton', function () { game.state.start('play'); }, this);
		    this.button.anchor.setTo(0.5,0.5);

		    this.buttontext = game.add.text(0, 0, "Start", { font: "32px Arial", fill: "#FFFFFF", align: "center" });
		    this.buttontext.anchor.setTo(0.5,0.5);

		    this.button.addChild(this.buttontext);

		},

		update : function () {
			var game = app.game;

		}

	}

	return menuState;
})