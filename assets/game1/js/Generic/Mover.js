class Mover {

    constructor() {
        // may be upgraded in sprite
        this.x           = 0
        this.y           = 0
        this.speed       = 1
        this.loopIndex   = 0
        this.cycleLoop   = []
        this.facingDown  = 0
        this.facingUp    = 1
        this.facingLeft  = 2
        this.facingRight = 3

    }

    preMove(grid) {
        this.last.push({x: this.x, y: this.y})
    }

    postMove(grid) {
        if(this.last.length == 1) {
            this.loopIndex = (this.loopIndex + 1) % this.cycleLoop.length
        }
    }

    moveUp(grid) {
        this.preMove(grid)
        this.y -= this.speed
        this.direction = this.facingUp
        this.postMove(grid)
    }

    moveDown(grid) {
        this.preMove(grid)
        this.y += this.speed
        this.direction = this.facingDown
        this.postMove(grid)
    }

    moveLeft(grid) {
        this.preMove(grid)
        this.x -= this.speed
        this.direction = this.facingLeft
        this.postMove(grid)
    }

    moveRight(grid) {
        this.preMove(grid)
        this.x += this.speed
        this.direction = this.facingRight
        this.postMove(grid)
    }
}

export default Mover