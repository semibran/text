import loadImage from "img-load"
import normalize from "./sprites"
import * as View from "./view"
import { format } from "./message"
import { red, blue, gray, charcoal } from "./message/colors"

let state = {
	messages: [
		format(gray)`In ${ blue("Taciturn") }, you use ${ charcoal("units") } to complete map objectives.`,
		format(gray)`The goal for this map is to ${ red("defeat all enemy units") }.`,
		format(gray)`Let's begin by selecting one of ${ blue("your units") }.`,
	]
}

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
