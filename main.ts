scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    StrtNwLvl()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -200
})
function StrtNwLvl () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    CrrntLvl += 1
    if (CrrntLvl == 1) {
        tiles.setTilemap(tilemap`level0`)
    } else if (CrrntLvl == 2) {
        tiles.setTilemap(tilemap`platformer1`)
    } else {
        game.over(false)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        myEnemy = sprites.create(img`
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 f f f f f f f f f f f f f f 2 
            2 f f f f 2 f f f f f 2 f f f 2 
            2 f 2 2 f 2 2 f f 2 2 2 f f f 2 
            2 f 2 2 f f 2 f 2 f f f f f f 2 
            2 f f f f f 2 2 2 f 2 2 f f f 2 
            2 f f f f f f f f f 2 2 f f f 2 
            2 f f f f f f f f f f f f f f 2 
            2 f f f f f f f f f f f f f f 2 
            2 f f f f f f f f f f f f f f 2 
            2 f f f f f 2 2 2 f f f f f f 2 
            2 f f 2 2 2 f f 2 2 2 2 2 2 f 2 
            2 f f 2 f f f f f f f f f 2 f 2 
            2 f f f f f f f f f f f f f f 2 
            2 f f f f f f f f f f f f f f 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `, SpriteKind.Enemy)
        myEnemy.ay = 500
        tiles.placeOnTile(myEnemy, value)
        myEnemy.follow(mySprite, 30)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let myEnemy: Sprite = null
let CrrntLvl = 0
let mySprite: Sprite = null
scene.setBackgroundColor(11)
mySprite = sprites.create(img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 d 4 c . . 
    . . . . b 5 5 1 f f d d 4 4 4 b 
    . . . . b 5 5 d f b 4 4 4 4 b . 
    . . . b d 5 5 5 5 4 4 4 4 b . . 
    . b b d d d 5 5 5 5 5 5 5 b . . 
    b d d d b b b 5 5 5 5 5 5 5 b . 
    c d d b 5 5 d c 5 5 5 5 5 5 b . 
    c b b d 5 d c d 5 5 5 5 5 5 b . 
    c b 5 5 b c d d 5 5 5 5 5 5 b . 
    b b c c c d d d 5 5 5 5 5 d b . 
    . . . . c c d d d 5 5 5 b b . . 
    . . . . . . c c c c c b b . . . 
    `, SpriteKind.Player)
mySprite.ay = 500
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
info.setLife(3)
StrtNwLvl()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
                value.vy = -150
            } else if (value.vx > 0 && value.tileKindAt(TileDirection.Right, assets.tile`tile1`)) {
                value.vy = -150
                value.vy = -150
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = -30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = 30
        }
    }
})
