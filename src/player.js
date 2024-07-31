// src/player.js

let PLAYER_SPEED = 160;

export function getPlayerSpeed() {
  return PLAYER_SPEED;
}

export function setPlayerSpeed(speed) {
  PLAYER_SPEED = speed;
}

export function createPlayer(scene) {
  const player = scene.physics.add.sprite(
    scene.game.config.width / 2,
    scene.game.config.height / 2,
    "player",
  );
  player.setCollideWorldBounds(false); // Set to false to handle custom wrapping
  return player;
}

export function updatePlayerMovement(player, cursors, speed) {
  if (cursors.left.isDown) {
    player.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.setVelocityX(speed);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.setVelocityY(speed);
  } else {
    player.setVelocityY(0);
  }
}

export function wrapPlayer(player, width, height) {
  if (player.x < 0) {
    player.x = width;
  } else if (player.x > width) {
    player.x = 0;
  }

  if (player.y < 0) {
    player.y = height;
  } else if (player.y > height) {
    player.y = 0;
  }
}
