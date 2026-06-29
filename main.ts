function create_pipe (x: number) {
    gap_y = randint(25, 90)
    top_pipe = sprites.create(img`
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        `, SpriteKind.Enemy)
    top_pipe.setScale(2, ScaleAnchor.Middle)
    top_pipe.left = x
    top_pipe.bottom = gap_y - 15
    top_pipe.vx = -50
    bottom_pipe = sprites.create(img`
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        7 7 7 7 
        `, SpriteKind.Enemy)
    bottom_pipe.setScale(2, ScaleAnchor.Middle)
    bottom_pipe.left = x
    bottom_pipe.top = gap_y + 15
    bottom_pipe.vx = -50
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, pipe) {
    game.over(false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bird.vy = -120
})
let score = 0
let bottom_pipe: Sprite = null
let top_pipe: Sprite = null
let gap_y = 0
let bird: Sprite = null
// Flappy Bird Clone - MakeCode Arcade Python
bird = sprites.create(img`
    . . 5 5 . . 
    . 5 5 5 5 . 
    5 5 5 5 5 5 
    5 5 f 5 5 5 
    5 5 5 5 5 5 
    . 5 5 5 5 . 
    . . 5 5 . . 
    `, SpriteKind.Player)
bird.setPosition(30, 60)
let gravity = 20
info.setScore(0)
create_pipe(120)
create_pipe(200)
scene.setBackgroundColor(9)
game.onUpdate(function () {
    bird.ay = gravity * 10
    if (bird.top < 0) {
        bird.top = 0
    }
    if (bird.bottom > 120) {
        game.over(false)
    }
})
game.onUpdateInterval(2500, function () {
    create_pipe(180)
})
game.onUpdateInterval(2500, function () {
    score += 1
    info.setScore(score)
})
