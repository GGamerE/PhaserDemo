class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('sky', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjODdDRUVCIi8+Cjwvc3ZnPgo=');
        this.load.image('star', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN0YXIgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIiBmaWxsPSIjRkZENzAwIi8+Cjwvc3ZnPgo=');
        this.load.image('bomb', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iIzNBM0EzQSIvPgo8L3N2Zz4K');
        this.load.image('player', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMxIiBoZWlnaHQ9IjMxIiB4PSIwLjUiIHk9IjAuNSIgZmlsbD0iI0ZGMDAwMCIgc3Ryb2tlPSIjQ0MwMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=');
        
        this.load.image('tiles', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap.json');
        this.load.image('box', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMxIiBoZWlnaHQ9IjMxIiB4PSIwLjUiIHk9IjAuNSIgZmlsbD0iI0Q4N0QzNyIgc3Ryb2tlPSIjODU0RDE2IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=');
    }

    create() {
        this.add.image(400, 300, 'sky');

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tileset', 'tiles');
        const platforms = map.createLayer('Platforms', tileset, 0, 0);
        
        platforms.setCollisionByProperty({ collides: true });
        platforms.setCollisionByExclusion([0]);

        this.player = this.physics.add.sprite(64, 384, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);


        this.boxes = this.physics.add.group();
        this.boxes.create(200, 400, 'box');
        this.boxes.create(350, 350, 'box');
        this.boxes.create(500, 320, 'box');
        this.boxes.create(650, 180, 'box');

        this.boxes.children.entries.forEach((box) => {
            box.setCollideWorldBounds(true);
            box.setBounce(0.1);
        });

        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.boxes, platforms);
        this.physics.add.collider(this.player, this.boxes);
        this.physics.add.collider(this.boxes, this.boxes);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.entries.forEach((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, platforms);
        this.physics.add.collider(this.stars, this.boxes);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, platforms);
        this.physics.add.collider(this.bombs, this.boxes);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.pushBoxes('left');
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.pushBoxes('right');
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    pushBoxes(direction) {
        this.boxes.children.entries.forEach((box) => {
            if (this.physics.world.overlap(this.player, box)) {
                const pushForce = direction === 'left' ? -50 : 50;
                box.setVelocityX(pushForce);
            }
        });
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.entries.forEach((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0x888888);
        this.gameOver = true;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: GameScene
};

const game = new Phaser.Game(config);