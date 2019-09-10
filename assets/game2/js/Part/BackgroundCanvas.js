/**
 * Background canvas
 */
class BackgroundCanvas extends ForegroundCanvas{

    constructor() {
        super()
        this.canvas = document.getElementById('background')
        this.init()
    }

    init() {
        this.canvas.width = 800
        this.canvas.height = 600
        this.c = this.bgCanvas.getContext('2d')
        this.c.font = "20px Arial"
    }

    getCanvas() {
        return this.canvas
    }

    getContext() {
        return this.c
    }
}


export default {
    BackgroundCanvas,
    ForegroundCanvas
}