/*global define, app*/

define(['Phaser'], function (Phaser) {
    'use strict';
    var endState = function (game) {};

    endState.prototype = {
        create : function () {
            var game = app.game;

            game.stage.backgroundColor = '#5E3F6B';

            this.buttontext = game.add.text(250, 100, 'You Win!', { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

            this.buttontext = game.add.text(200, 300, 'Your score was ' + app.score, { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

            this.buttontext = game.add.text(220, 500, 'Press F5 to restart', { font: "32px Arial", fill: "#FFFFFF", align: "center" });
            this.buttontext.fixedToCamera = true;

        },

        update : function () {
        }

    }

    return endState;
})
