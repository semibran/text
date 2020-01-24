import Canvas from "../lib/canvas"
import * as palette from "./sprites/colors"

export function create(width, height, sprites) {
	let view = {
		native: { width, height },
		scale: 1,
		sprites: sprites,
		element: document.createElement("canvas")
	}

	function resize() {
		let scaleX = Math.max(1, Math.floor(window.innerWidth / view.native.width))
		let scaleY = Math.max(1, Math.floor(window.innerHeight / view.native.height))
		view.scale = Math.min(scaleX, scaleY)
	}

	resize()
	window.addEventListener("resize", _ => {
		resize()
		render(view)
	})

	return view
}

export function render(view, state) {
	let canvas = view.element
	let context = canvas.getContext("2d")
	canvas.width = Math.ceil(window.innerWidth / view.scale)
	canvas.height = Math.ceil(window.innerHeight / view.scale)
	canvas.style.transform = `scale(${view.scale})`
	context.fillStyle = "black"
	context.fillRect(0, 0, canvas.width, canvas.height)

	let a = view.sprites.fonts.normal.Text("Hector received 2 damage.")
	let b = view.sprites.fonts.bold.Text("Soldier, Bandit, Knight")
	let c = view.sprites.fonts.smallcaps.Text("SYSTEM . TUTORIAL", palette.red)
	context.drawImage(a, 0, 0)
	context.drawImage(b, 0, a.height + 1)
	context.drawImage(c, 0, a.height + 1 + b.height + 1)

	let text = view.sprites.fonts.normal.TextMulti("The goal for this map is to defeat all enemy units.", palette.gray, canvas.width - 22 - 6)
	context.fillStyle = "white"
	context.fillRect(3, canvas.height - 39 - 3, canvas.width - 6, 39)
	context.drawImage(text, 14, canvas.height - 39 - 3 + 9)
}
