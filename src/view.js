import Canvas from "../lib/canvas"
import renderDialogueBox from "./view/dialoguebox"
import * as colors from "./view/colors"
import * as pixels from "../lib/pixels"
import { slice, length, render as renderMessage } from "./message"

export function create(width, height, sprites) {
	return {
		native: { width, height },
		scale: 1,
		sprites: sprites,
		element: document.createElement("canvas"),
		state: {
			time: 0,
			text: {
				index: 0,
				time: 0,
				waiting: false
			},
			input: {
				tapping: false
			}
		}
	}
}

export function init(view) {
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

	window.addEventListener("touchstart", _ => {
		view.state.input.tapping = true
	})
}

export function update(view, state) {
	view.state.time++
	if (view.state.input.tapping) {
		view.state.input.tapping = false
		if (!view.state.text.waiting) {
			view.state.text.waiting = true
		} else if (view.state.text.index + 1 < state.messages.length) {
			view.state.text.waiting = false
			view.state.text.index++
			view.state.text.time = view.state.time
		}
	}
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
	let message = state.messages[view.state.text.index]
	let t = view.state.time - view.state.text.time
	let d = length(message)
	if (t < d && !view.state.text.waiting) {
		message = slice(message, 0, t)
	} else if (!view.state.text.waiting) {
		view.state.text.waiting = true
	}
	let textbox = renderDialogueBox(message, "System", view.sprites, width - margin * 2).getContext("2d")
	if (view.state.text.waiting) {
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
