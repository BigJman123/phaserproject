Slime = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "slime");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.collideWorldBounds = true;
    this.enableBody = true;
    this.animations.add('right', [0, 1, 2, 3, 4], 5, true);
    this.animations.add('left', [5, 6, 7, 8, 9], 5, true);
    this.body.gravity.y = 640;
    this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
    this.body.bounce.x = 1;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 80;

};

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;

Slime.prototype.update = function () {

    var chasing = false;

    // check if the slime's y position on the map is equal to the player's y position
    // we use Math.round to ignore the decimal
    if (Math.round(this.y) == Math.round(player.y)) {
        // if both slime and player are on the same 'plane' move towards the player!
        if (Math.round(player.x) > Math.round(this.x)) {
            // we increase the speed from the default 80 to 200
            this.body.velocity.x = 200;
        } else {
            this.body.velocity.x = -200;
        }
        chasing = true;
    }

    if(!chasing){
        // when the slime isn't actively chasing the player,
        // reduce speeds back to normal
        if(this.body.velocity.x > 0){
            this.body.velocity.x = 80;
        } else if(this.body.velocity.x < 0){
            this.body.velocity.x = -80;
        }
    }

    game.physics.arcade.collide(this, platforms, function (slime, platform) {
        if (slime.body.velocity.x > 0 && slime.x > platform.x + (platform.width - slime.width) ||
                slime.body.velocity.x < 0 && slime.x < platform.x) {
            // this is still the old platform patrol AI from before
            // we added the chasing check so the slime will stop at the edge closest to the player
            if (chasing) {
                slime.body.velocity.x = 0;
            } else {
                slime.body.velocity.x *= -1;
            }
        }
    });

    game.physics.arcade.collide(this, slimes, function (slime, slimes) {
        slime.body.velocity.x *= -1;
    });

    if (this.body.velocity.x > 0) {
        // this.animations.stop();
        this.animations.play('right');
    } else {
        //this.animations.stop();
        this.animations.play('left');
    }

};

function handlePlayerMovement() {
    if (cursors.left.isDown) {
        direction = -1;
    }
    else if (cursors.right.isDown) {
        direction = 1;
    }
}