import Grid from "./Grid";
import Luigi from "./Sprite/Luigi";

class Game {

    constructor(){

        this.sprite  = new Luigi()
        this.grid    = new Grid(16, 12, 50)
        this.grid.draw()
        this.sprite.draw(this.grid)

        this.run()
    }

    run() {}

}

export default Game