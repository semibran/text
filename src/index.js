import loadImage from "img-load"
import normalize from "./sprites"
import * as View from "./view"

loadImage("sprites.png").then(main)

function main(spritesheet) {
	let sprites = normalize(spritesheet)
	let view = View.create(sprites)
	View.render(view)
	document.body.appendChild(view.element)
}
