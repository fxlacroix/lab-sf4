import Multi from "./Lib/Multi";
import Utils from "./Lib/Utils"
import Canvas from "./Part/Canvas"

/**
 * Grid component
 */
class Grid extends Canvas.Background {

    constructor(xGrid, yGrid, scale) {

        super()

        this.scale = scale
        this.width = xGrid * scale
        this.height = yGrid * scale
        this.matrix = []
        this.blocks = []
        this.keys = []

        this.generateMatrix(xGrid, yGrid)
    }

    generateMatrix(xGrid, yGrid) {
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
    }

    detectGridCell(item) {

        let x = Math.floor((item.x + item.width) / this.scale)
        let y = Math.floor((item.y + item.height) / this.scale)

        return {x: x, y: y}
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

    colorCell(cell) {

        this.c.fillRect(cell.x * this.scale, cell.y * this.scale, this.scale, this.scale);
        this.c.stroke()
    }

}

export default Grid