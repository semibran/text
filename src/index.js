import loadImage from "img-load"
import normalize from "./sprites"
import * as View from "./view"

let state = {}

loadImage("sprites.png").then(main)

function main(spritesheet) {
	let sprites = normalize(spritesheet)
	let view = View.create(160, 160, sprites)
	View.init(view)
	View.render(view, state)
	document.body.appendChild(view.element)
	requestAnimationFrame(loop)

	function loop() {
		View.render(view, state)
		View.update(view, state)
		requestAnimationFrame(loop)
	}
}
