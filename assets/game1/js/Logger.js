import Canvas from "./Generic/Canvas"

/**
 * Logger display informaiton
 */
class Logger extends Canvas {

    constructor(){
        super()
    }

    show(sprite) {

        $(".luigi .life").html(sprite.life)
        $(".luigi .x").html(sprite.x)
        $(".luigi .y").html(sprite.y)

    }
}

export default Logger

