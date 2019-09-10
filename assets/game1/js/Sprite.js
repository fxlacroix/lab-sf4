import Canvas from "./Generic/Canvas";
import Logger from "./Logger"

/**
 * Abstract sprite
 */
class Sprite extends Canvas{

    constructor(x, y) {

        super()

        this.x          = 0
        this.y          = 0

        this.last       = {x: this.x, y: this.y}
        this.path       = []
        this.img        = new Image()

        this.loopIndex  = 0
        this.path       = []
        this.pathReal   = []

        this.logger     = new Logger()

    }

    draw(grid) {

        this.c.drawImage(
            this.img,
            this.cycleLoop[this.loopIndex] * this.width,
            this.direction * this.height,
            this.width,
            this.height,
            this.x + (grid.scale - this.width)  / 4,
            this.y + (grid.scale - this.height) / 4,
            this.scaledWidth(),
            this.scaledHeight()
        )
    }

    delete(scale) {

        this.c.clearRect(this.last.x + (scale- this.width)  / 4, this.last.y + (scale- this.height) / 4, this.scaledWidth(), this.scaledHeight())
    }

    move(grid) {

        if(this.pathReal.length) {

            let cell = this.pathReal.shift()

            this.last.x = this.x = cell.x
            this.last.y = this.y = cell.y

            this.direction  = cell.direction
            this.loopIndex = (++this.loopIndex) % this.cycleLoop.length

            if(this.pathReal.length == 0) {
                this.loopIndex = 0
                this.direction = this.facingDown
            }

            // delete, draw grid, draw sprite
            this.draw(grid)

        } else {
            this.path       = []
        }
    }

    canMove(direction, grid) {

        let deltaX = 0,
            deltaY = 0

        switch(direction) {
            case 'up':
                deltaY = - this.speed - this.scaledHeight()
                break
            case 'down':
                deltaY = this.speed  + this.height
                break
            case 'left':
                deltaX = - this.speed  - this.scaledWidth()
                break
            case 'right':
                deltaX = this.speed + this.width
                break
        }

        let cell = grid.detectGridCell({
            x: this.x + deltaX,
            y: this.y + deltaY,
            width: this.scaledWidth(),
            height: this.scaledHeight(),
        })

        if(typeof grid.matrix[cell.x] != 'undefined'
            && typeof grid.matrix[cell.x][cell.y]  != 'undefined'
            && grid.matrix[cell.x][cell.y]  == 0
        ) {

            return true
        }

        return false
    }

    updateLoopIndex(loopIndexUp) {

        if (! loopIndexUp) {
            this.loopIndex = ++this.loopIndex % this.cycleLoop.length
            loopIndexUp = true
        }
        return loopIndexUp
    }

    savePosition() {

        this.last = {
            x: this.x,
            y: this.y
        }
    }

    detectCollision(item, scale) {

        if((this.x  <= item.x && this.x + this.width + scale / 2 >= item.x && this.y <= item.y && this.y + this.height + scale / 2 >= item.y)
          ||
          (this.x >= item.x && this.x - this.width - scale / 2 <= item.x && this.y >= item.y && this.y - this.height - + scale / 2 <= item.y))
        {
            return true
        }
        return false
    }

    scaledWidth() {
        return this.scale * this.width
    }

    scaledHeight() {
        return this.scale * this.height
    }
}

export default Sprite