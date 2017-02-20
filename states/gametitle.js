var gameTitle = function(game){}
 
gameTitle.prototype = {

  	create: function(){
		var gameTitle = this.game.add.image(400, 300, "sky");
		gameTitle.anchor.setTo(0.5, 0.5);
		var playButton = this.game.add.button(390, 400, "play", this.playTheGame, this);
		playButton.anchor.setTo(0.5, 0.5);
	},

	playTheGame: function(){
		this.game.state.start("Level1");
	}
}