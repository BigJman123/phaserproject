Bullet = function (game, x, y, direction, speed) {
    Phaser.Sprite.call(this, game, x, y, "batarang");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.animations.add('rightbatarang', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 25, true);
    this.animations.add('leftbatarang', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 25, true);
    this.xSpeed = direction * speed;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {

    // bullet animations
    let animation = direction == 1 ? 'rightbatarang' : 'leftbatarang';
    this.animations.play(animation);

    game.physics.arcade.overlap(this, platforms, function (bullet) {
        setTimeout(() => bullet.destroy(), 1)
    });

    game.physics.arcade.overlap(this, slimes, function (bullet, slime) {
        slime.destroy();
        setTimeout(() => bullet.destroy(), 1);
    });

    if (this.body == null) {
        return;
    } else {
        this.body.velocity.y = 0;
        this.body.velocity.x = this.xSpeed;
    }

    if(this.x < 0 || this.x > 800) {
        this.destroy();
    }

};

function shootBullet() {
    if (bullets.length < 5) {
        var bullet = new Bullet(game, player.x + 10, player.y + 10, direction, bulletXSpeed);
        bullets.add(bullet);
    }
}