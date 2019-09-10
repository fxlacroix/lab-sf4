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
        this.occurence   = 3

    }

    preMove(grid) {
        this.last.push({
            x: this.x,
            y: this.y
        })
    }

    postMove(grid) {
        this.loopIndex = (this.loopIndex + 1) % this.cycleLoop.length
    }

    moveUp(grid, occurence) {

        this.preMove(grid)
        this.y -= this.speed
        this.direction = this.facingUp
        this.update(grid)

        if(typeof occurence === 'undefined') {
            occurence = this.occurence
        }

        if(occurence) {
            requestAnimationFrame(function(){
                this.moveUp(grid, --occurence)
            }.bind(this))
        }
        this.postMove(grid)
    }

    moveDown(grid, occurence) {

        this.preMove(grid)
        this.y += this.speed
        this.direction = this.facingDown
        this.update(grid)

        if(typeof occurence === 'undefined') {
            occurence = this.occurence
        }

        if(occurence) {
            requestAnimationFrame(function(){
                this.moveDown(grid, --occurence)
            }.bind(this))
        }
        this.postMove(grid)
    }

    moveLeft(grid, occurence) {

        this.preMove(grid)
        this.x -= this.speed
        this.direction = this.facingLeft
        this.update(grid)

        if(typeof occurence === 'undefined') {
            occurence = this.occurence
        }

        if(occurence) {
            requestAnimationFrame(function(){
                this.moveLeft(grid, --occurence)
            }.bind(this))
        }
        this.postMove(grid)
    }

    moveRight(grid, occurence) {

        this.preMove(grid)
        this.x += this.speed
        this.direction = this.facingRight
        this.update(grid)

        if(typeof occurence === 'undefined') {
            occurence = this.occurence
        }

        if(occurence) {
            requestAnimationFrame(function(){
                this.moveRight(grid, --occurence)
            }.bind(this))
        }
        this.postMove(grid)
    }
}

export default Mover