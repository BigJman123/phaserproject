var level1 = function(game) {
    let platforms;
    let slimes;
    let bullets;
    let stars;

    let player;

    let healthText;
    let healthbar;
    let playerHealth = 100;
    let invincible = false;

    let cursors;
    let spaceBar;

    let direction = 1;

    let bulletXSpeed = 300;

    let score = 0;
    let scoreText;
}

level1.prototype = {
    preload: function() {

    },

    create: function() {

        var game = this.game;
        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and ledges then we enable physics on platforms
        platforms = this.add.group();
        platforms.enableBody = true;

        // Here we create the ground and scale it to fit the width of the game
        var ground = platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        // Top Ledge
        ledge = platforms.create(100, 200, 'ground2');
        ledge.body.immovable = true;
        // Second ledge from top
        ledge = platforms.create(100, 315, 'ground2');
        ledge.body.immovable = true;
        // Third ledge from top
        ledge = platforms.create(100, 425, 'ground2');
        ledge.body.immovable = true;
        


        // The player and its settings
        player = this.add.sprite(375, this.world.height - 95, 'batman');

        //  Player physics properties. Give the little guy a slight bounce.
        this.physics.arcade.enable(player);
        player.body.bounce.y = 0.0;
        player.body.gravity.y = 515;
        player.body.collideWorldBounds = true;

        //  Our three animations, walking left ,right and jumping.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.animations.add('jumpleft', [10], 10, true);
        player.animations.add('jumpright', [9], 10, true);

        // Health bar
        var barConfig = {x: 200, y: 100};
        healthbar = new HealthBar(this.game, {x: 675, y: 40});

        // makes a stars group and enables physics
        stars = this.add.group();
        stars.enableBody = true;

        // creates the stars and displays them in the game
        stars.create(390, 178, 'star');
        stars.create(390, 293, 'star');
        stars.create(390, 403, 'star');

        // the bullet group contains all bullets and enables physics on them.
        bullets = this.add.group();
        bullets.enableBody = true;
        
        // the slime group contains all slimes and enables physics on them. The for loop adds slimes to the game.
        slimes = this.add.group();
        slimes.enableBody = true;

        let slimeLocations = [
            // Top ledge
            [150, 175],
            [350, 175],
            [550, 175],
            
            // Second ledge from top
            [150, 290],
            [350, 290],
            [550, 290],
            
            // Third ledge from the top
            [150, 400],
            [350, 400],
            [550, 400]
            
        ];

        // a function that gives a random integer
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }

        // let offset = 250;
        slimeLocations.forEach(function (location) {
            let rand = getRandomInt(0, 100);
            // setTimeout(() => {
                var slime = new Slime(game, location[0] + rand, location[1]);
                slimes.add(slime);    
            // }, 500 + offset);
            // offset += 500;

        });
        
        
        store.set('score', 0);
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        
        healthText = this.add.text(575, 3, 'health');


        // this makes the spacebar the key that shoots bullets
        spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(shootBullet, this);
        cursors = this.input.keyboard.createCursorKeys();
    },


    update: function() {
        var game = this.game;
        //  Collide the player and the stars with the platforms
        var hitPlatform = this.physics.arcade.collide(player, platforms);

        var hitSlime = this.physics.arcade.collide(player, slimes);
        
        var killSlime = this.physics.arcade.overlap(bullets, slimes);

        var grabStar = this.physics.arcade.overlap(player, stars, collectStar, null, this);


        // health and stuffs

        if (hitSlime && ! invincible && ! cheats.check('god')) {
            playerHealth -= 33;
            healthbar.setPercent(playerHealth);
            makeInvincible();
            game.camera.flash(0xff0000, 500);
            setTimeout(() => notInvincible(), 1000);
        }

        function makeInvincible() {
            invincible = true;
            player.alpha = 0.2;
        }

        function notInvincible() {
            invincible = false;
            player.alpha = 1;
        }

        if (this.playerHealth == 1) {
            this.player.kill();
            store.set('score', 0);
            setTimeout(() => this.add.text(315, 100, 'Game Over', { fontSize: '30px', fill: '#000' }), 500);
            setTimeout(() => location.reload(), 1500);
        }
        
        // increases the score by 10 when a slime hit by a bullet
        if (killSlime) {
            score += 10;
            scoreText.text = 'score: ' + score;
        }

        if (grabStar) {
            score += 50;
            scoreText.text = 'score: ' + score;
        }

        if (stars.countLiving() == 0){
            store.set('score', score);
            setTimeout(() => this.add.text(315, 100, 'You Win!', { fontSize: '30px', fill: '#ffd799'}), 500);
            
            setTimeout(() => {window.location = 'level2.html'}, 3000);
        }

        function collectStar(player, stars) {
            stars.kill();
        }

        // helper
        function playerIsOnGround() {
            return player.body.touching.down && hitPlatform;
        }

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        handlePlayerMovement();

        
        if (cursors.left.isDown) {

            player.body.velocity.x = -150;

            let animation = playerIsOnGround() ? 'left' : 'jumpleft';
            player.animations.play(animation);

        } else if (cursors.right.isDown) {

            player.body.velocity.x = 150;

            let animation = playerIsOnGround() ? 'right' : 'jumpright';
            player.animations.play(animation);

        } else {
            //  Stand still
            player.animations.stop();

            if (playerIsOnGround()) {
                player.frame = 4;
            }
        }

        // Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.frame = 9;
            player.body.velocity.y = -350;
        }

    }

}
