import Canvas from "../lib/canvas"
import renderTextBox from "./view/textbox"
import * as colors from "./view/colors"
import * as pixels from "../lib/pixels"
import * as Message from "./message"

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
	let fonts = view.sprites.fonts
	let canvas = view.element
	let context = canvas.getContext("2d")
	canvas.width = Math.ceil(window.innerWidth / view.scale)
	canvas.height = Math.ceil(window.innerHeight / view.scale)
	canvas.style.transform = `scale(${view.scale})`
	context.fillStyle = "black"
	context.fillRect(0, 0, canvas.width, canvas.height)

	let a = Message.render(Message.format()`Hector received ${ Message.red("2 damage") }.`, fonts.normal)
	let b = Message.render(Message.format()`Soldier, Knight, Bandit`, fonts.bold)
	let c = Message.render(Message.format()`SYSTEM TUTORIAL`, fonts.smallcaps)
	context.drawImage(a, 0, 0)
	context.drawImage(b, 0, a.height + 1)
	context.drawImage(c, 0, a.height + 1 + b.height + 1)

	let message = Message.format(Message.gray)`The goal for this map is to ${ Message.red("defeat all enemy units") }.`
	let textbox = renderTextBox(message, fonts.normal, canvas.width - 6, 2)
	context.drawImage(textbox, 3, canvas.height - textbox.height - 3)
}
