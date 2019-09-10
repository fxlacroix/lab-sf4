/**
 * Basic Canvas
 */
class Canvas {

    init() {
        this.canvas.width = 800
        this.canvas.height = 600
        this.c = this.canvas.getContext('2d')
        this.c.font = "20px Arial"
    }

    getCanvas() {
        return this.canvas
    }

    getContext() {
        return this.c
    }
}

/**
 * Background canvas
 */
class Background extends Canvas{

    constructor() {
        super()
        this.canvas = document.getElementById('background')
        this.init()
    }
}

/**
 * Foreground canvas
 */
class Foreground extends Canvas {

    constructor() {
        super()
        this.canvas = document.getElementById('foreground')
        this.init()
    }

}

export default {
    Background,
    Foreground,
}