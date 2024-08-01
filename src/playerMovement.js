export function handleMovement(player) {
  if (player.cursors.left.isDown) {
    player.sprite.x -= player.speed;
  } else if (player.cursors.right.isDown) {
    player.sprite.x += player.speed;
  }

  if (player.cursors.up.isDown) {
    player.sprite.y -= player.speed;
  } else if (player.cursors.down.isDown) {
    player.sprite.y += player.speed;
  }
}

export function wrapAroundScreenEdges(player) {
  if (player.sprite.x < -player.spriteWidth / 2) {
    player.sprite.x = player.scene.cameras.main.width + player.spriteWidth / 2;
  } else if (
    player.sprite.x >
    player.scene.cameras.main.width + player.spriteWidth / 2
  ) {
    player.sprite.x = -player.spriteWidth / 2;
  }

  if (player.sprite.y < -player.spriteHeight / 2) {
    player.sprite.y =
      player.scene.cameras.main.height + player.spriteHeight / 2;
  } else if (
    player.sprite.y >
    player.scene.cameras.main.height + player.spriteHeight / 2
  ) {
    player.sprite.y = -player.spriteHeight / 2;
  }
}
