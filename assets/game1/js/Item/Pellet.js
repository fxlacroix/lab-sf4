// JS Libs
import Multi from '../Generic/Multi'
import Canvas from '../Generic/Canvas'
import Utils from '../Generic/Utils'

class Pellet extends Canvas{

    constructor(width, height) {

        super()
        this.width  = width
        this.height = height
        this.init()
    }

    init() {
        this.x = Utils.randomIntFromRange(0, this.width)
        this.y = Utils.randomIntFromRange(0, this.height)
        this.radius = 5
    }

    update() {
        this.init()
    }

    draw() {
        this.c.beginPath()
        this.c.fillStyle = 'black'
        this.c.strokeStyle = 'black'
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.c.fill()
        this.c.closePath()
    }
    //
    // delete() {
    //     this.c.beginPath()
    //     this.c.fillStyle = 'white'
    //     this.c.strokeStyle = 'white'
    //     this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //     this.c.fill()
    //     this.c.closePath()
    // }
}

export default Pellet