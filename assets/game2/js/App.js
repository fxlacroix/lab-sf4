import '../css/app.scss'
import Game from './Game'



let game = new Game()
let grid = game.grid

// all game events
addEventListener('keydown', (event) => {


    if(event.key ==  'ArrowUp') {

        let event = new CustomEvent("ArrowUp", {
            detail: grid
        });

        dispatchEvent(event)

    } else if(event.key ==  'ArrowDown') {

        let event = new CustomEvent("ArrowDown", {
            detail: grid
        });

        dispatchEvent(event)
    }

    if(event.key ==  'ArrowLeft') {

        let event = new CustomEvent("ArrowLeft", {
            detail: grid
        });

        dispatchEvent(event, game)

    } else if(event.key ==  'ArrowRight') {

        let event = new CustomEvent("ArrowRight", {
            detail: grid
        });

        dispatchEvent(event, game)
    }
})

