var preload = function(game){}
 
preload.prototype = {

	preload: function(){ 
        var loadingBar = this.add.sprite(400, 300, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

		this.game.load.image('sky', 'assets/sky.png');
    	this.game.load.image('play', 'assets/play.png');
	    this.game.load.image('ground', 'assets/platform.png');
	   	this.game.load.image('ground2', 'assets/platform6.png');
	   	this.game.load.image('ground3', 'assets/platform3.png');
	   	this.game.load.image('ground4', 'assets/platform4.png');
    	this.game.load.image('ground5', 'assets/platform5.png');
	    this.game.load.spritesheet('batman', 'assets/batman.png', 32, 32);
	    this.game.load.spritesheet('batarang', 'assets/batarang.png', 9, 9);
	    this.game.load.spritesheet('slime', 'assets/slime.png', 28, 28);
	    this.game.load.spritesheet('star', 'assets/star.png');
	},

  	create: function(){
		this.game.state.start("GameTitle");
	}
}