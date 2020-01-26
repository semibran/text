import Canvas from "../lib/canvas"
import renderDialogueBox from "./view/dialoguebox"
import * as colors from "./view/colors"
import * as pixels from "../lib/pixels"
import { format, slice, length, render as renderMessage } from "./message"
import { red, blue, gray, charcoal } from "./message/colors"

export function create(width, height, sprites) {
	let view = {
		native: { width, height },
		scale: 1,
		sprites: sprites,
		element: document.createElement("canvas"),
		time: 0
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

export function update(view) {
	view.time++
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

	const margin = 4
	let width = canvas.width > 160 ? canvas.width * 0.75 : canvas.width
	let message = format(gray)`In ${ blue("Taciturn") }, you use ${ charcoal("units") } to complete map objectives.`
	if (view.time) {
		let t = view.time
		let d = length(message)
		let time = Math.min(d, t)
		let textbox = renderDialogueBox(slice(message, 0, time), "System", view.sprites, width - margin * 2).getContext("2d")
		if (t >= d) {
			let arrow = view.sprites.arrow
			let p = (d - t) % 30 / 30
			let o = Math.round(Math.cos(Math.PI * 2 * p))
			let x = textbox.canvas.width - arrow.width - 10
			let y = textbox.canvas.height - arrow.height - 10
			textbox.globalAlpha = 0.25
			textbox.drawImage(arrow, x + 1, y + o + 1)
			textbox.drawImage(arrow, x, y + o + 1)
			textbox.globalAlpha = 1
			textbox.drawImage(arrow, x, y + o)
		}
		context.drawImage(textbox.canvas, canvas.width / 2 - width / 2 + margin, canvas.height - textbox.canvas.height - margin)
	}
}
