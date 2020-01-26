import loadImage from "img-load"
import normalize from "./sprites"
import * as View from "./view"

loadImage("sprites.png").then(main)

function main(spritesheet) {
	let sprites = normalize(spritesheet)
	let view = View.create(160, 160, sprites)
	View.render(view)
	document.body.appendChild(view.element)
	requestAnimationFrame(loop)

	function loop() {
		View.render(view)
		View.update(view)
		requestAnimationFrame(loop)
	}
}
