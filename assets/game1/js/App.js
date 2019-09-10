import '../css/app.scss'
import Grid     from "./Grid"
import Luigi    from "./Sprite/Luigi"
import Charles  from "./Sprite/Charles"

/**
 * Game
 */
new class Game {

    constructor() {

        let sprite   = new Luigi(0, 0)
        let computer = new Charles(15, 11)
        this.grid    = new Grid(16, 12, 50, sprite, computer)
        this.addEvents()
    }

    addEvents() {
        addEventListener('keydown', (event) => {
            this.grid.keys[event.key] = true;
        })

        addEventListener('keyup', (event) => {
            this.grid.keys[event.key] = false;
            this.grid.sprite.direction = this.grid.sprite.facingDown
        })
    }
}
