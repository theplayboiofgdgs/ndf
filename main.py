
# Flappy Bird Clone - MakeCode Arcade Python

bird = sprites.create(img("""
    . . 5 5 . .
    . 5 5 5 5 .
    5 5 5 5 5 5
    5 5 f 5 5 5
    5 5 5 5 5 5
    . 5 5 5 5 .
    . . 5 5 . .
"""), SpriteKind.player)

bird.set_position(30, 60)

gravity = 20
score = 0

info.set_score(0)

def flap():
    bird.vy = -120

controller.A.on_event(ControllerButtonEvent.PRESSED, flap)

def create_pipe(x):
    gap_y = randint(25, 90)

    top_pipe = sprites.create(img("""
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
    """), SpriteKind.enemy)

    top_pipe.set_scale(2)
    top_pipe.left = x
    top_pipe.bottom = gap_y - 15
    top_pipe.vx = -50

    bottom_pipe = sprites.create(img("""
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
        7 7 7 7
    """), SpriteKind.enemy)

    bottom_pipe.set_scale(2)
    bottom_pipe.left = x
    bottom_pipe.top = gap_y + 15
    bottom_pipe.vx = -50

create_pipe(120)
create_pipe(200)

def on_update():
    bird.ay = gravity * 10

    if bird.top < 0:
        bird.top = 0

    if bird.bottom > 120:
        game.over(False)

game.on_update(on_update)

def spawn_new_pipes():
    create_pipe(180)

game.on_update_interval(2500, spawn_new_pipes)

def hit_pipe(player, pipe):
    game.over(False)

sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, hit_pipe)

def score_system():
    global score
    score += 1
    info.set_score(score)

game.on_update_interval(2500, score_system)

scene.set_background_color(9)