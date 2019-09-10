import Multi from "./Generic/Multi";
import Canvas from "./Generic/Canvas"
import Mouse from "./Generic/Mouse"
import Pellet from './Item/Pellet'
import Utils from "./Generic/Utils"

/**
 * Grid component
 */
class Grid extends Multi.inherit(Canvas, Mouse) {

    constructor(xGrid, yGrid, scale, sprite, computer) {

        super()

        this.scale = scale
        this.width = xGrid * scale
        this.height = yGrid * scale
        this.framesPerSecond = 20
        this.sprite = sprite
        this.computer = computer
        this.pellet = new Pellet(this.width, this.height)

        this.matrix = []
        this.blocks = []

        this.keys = []

        for (let i = 0; i < xGrid; i++) {
            this.matrix[i] = []
            for (let j = 0; j < yGrid; j++) {
                // ugly ;)
                if (i != 0 && j != 0 && i != xGrid - 1 && j != yGrid - 1 && !Utils.randomIntFromRange(0, 5)) {

                    this.matrix[i][j] = 1
                    this.blocks.push({x: i, y: j})
                } else {
                    this.matrix[i][j] = 0
                }
            }
        }
        this.run()

    }

    run() {

        this.listen()
        this.update()

        // miam
        setTimeout(function() {
            requestAnimationFrame(this.run.bind(this))
        }.bind(this), 1000 / this.framesPerSecond);
    }

    update() {

        this.computer.delete(this.scale)
        this.sprite.delete(this.scale)

        this.draw()
        this.pellet.draw()

        this.blocks.forEach(function(cell){
            this.colorCell(cell)
        }.bind(this))

        this.sprite.draw(this)
        if(this.sprite.detectCollision(this.pellet, this.scale)){
            this.pellet.delete()
            this.sprite.consume(this.pellet)
        }

        // if(this.computer.pathReal.length == 0) {
        //     let cellUser     = this.detectGridCell(this.sprite)
        //     let cellComputer = this.detectGridCell(this.computer)
        //
        //     this.computer.path = Utils.findPath(this.matrix, Object.values(cellComputer), Object.values(cellUser))
        //     this.computer.pathReal = this.calculatePathReal(this.computer)
        // }
        //
        // this.computer.move(this)
    }

    listen() {

        let loopIndexUp = false

        this.sprite.savePosition()

        if (this.keys.ArrowUp) {

            if(this.sprite.canMove('up', this)) {

                this.sprite.y -= this.sprite.speed
                this.sprite.direction = this.sprite.facingUp
                loopIndexUp = this.sprite.updateLoopIndex(loopIndexUp)

            }
        }

        if (this.keys.ArrowDown) {

            if(this.sprite.canMove('down',this)) {

                this.sprite.y += this.sprite.speed
                this.sprite.direction = this.sprite.facingDown
                loopIndexUp = this.sprite.updateLoopIndex(loopIndexUp)
            }
        }

        if (this.keys.ArrowLeft) {

            if(this.sprite.canMove('left', this)) {

                this.sprite.x -= this.sprite.speed
                this.sprite.direction = this.sprite.facingLeft
                loopIndexUp = this.sprite.updateLoopIndex(loopIndexUp)
            }
        }

        if (this.keys.ArrowRight) {
            if(this.sprite.canMove('right', this)) {

                this.sprite.x += this.sprite.speed;
                this.sprite.direction = this.sprite.facingRight
                this.sprite.updateLoopIndex(loopIndexUp)
            }

        }

    }

    draw() {

        for (let x = 0; x <= this.width; x += this.scale) {
            this.c.moveTo(x, 0)
            this.c.lineTo(0 + x, 0 + this.height)
        }

        for (let y = 0; y <= this.height; y += this.scale) {
            this.c.moveTo(0, 0 + y)
            this.c.lineTo(0 + this.width, 0 + y)
        }

        this.c.stroke()
    }

    detectGridCell(item) {

        let x = Math.floor((item.x + item.width) / this.scale)
        let y = Math.floor((item.y + item.height) / this.scale)

        return {x: x, y: y}
    }

    colorCell(cell) {

        this.c.fillRect(cell.x * this.scale, cell.y * this.scale, this.scale, this.scale);
        this.c.stroke()
    }

    calculatePathReal(sprite) {

        let stops = []
        let duplicates = []
        let xFrom = sprite.x
        let yFrom = sprite.y
        let direction

        if (sprite.path.length) {

            for (let key in sprite.path) {

                for (let i = 0; i + sprite.speed < this.scale; i += sprite.speed) {

                    if (xFrom < sprite.path[key][0] * this.scale) {
                        xFrom += i
                        direction = sprite.facingRight
                    }
                    if (xFrom > sprite.path[key][0] * this.scale) {
                        xFrom -= i
                        direction = sprite.facingLeft
                    }
                    if (yFrom < sprite.path[key][1] * this.scale) {
                        yFrom += i
                        direction = sprite.facingDown
                    }
                    if (yFrom > sprite.path[key][1] * this.scale) {
                        yFrom -= i
                        direction = sprite.facingUp
                    }

                    let cell = {x: xFrom, y: yFrom, direction: direction}

                    if (duplicates.indexOf(cell.x + "-" + cell.y) == -1) {

                        duplicates.push(cell.x + "-" + cell.y)
                        stops.push(cell)
                    }
                }
            }

            stops[stops.length - 1].direction = sprite.defaultDirection

            // @todo: calibrate last movement to middle cell
            return stops
        }
        return []
    }
}

export default Grid