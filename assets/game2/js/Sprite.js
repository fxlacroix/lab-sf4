import Multi from './Lib/Multi'
import Mover from './Part/Mover'
import Canvas from "./Part/Canvas"


class Sprite extends Multi.inherit(Mover, Canvas.Foreground) {

    constructor() {

        super()

        this.x          = 0
        this.y          = 0
        this.last       = []

        this.path       = []
        this.pathReal   = []
        this.img        = new Image()

        this.loopIndex  = 1
        this.path       = []
        this.pathReal   = []
    }

    update(grid) {
        this.delete(grid)
        this.draw(grid)
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

    delete(grid) {

        while(this.last.length){

            let last = this.last.shift()
            this.c.clearRect(last.x + (grid.scale - this.width)  / 4, last.y + (grid.scale - this.height) / 4, this.scaledWidth(), this.scaledHeight())
        }
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

    scaledWidth() {
        return this.scale * this.width
    }

    scaledHeight() {
        return this.scale * this.height
    }

}

export default Sprite