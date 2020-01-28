import Canvas from "../lib/canvas"
import DialogueBox from "./view/dialoguebox"
import * as colors from "./view/colors"
import * as pixels from "../lib/pixels"
import { format, slice, length, render as renderMessage } from "./message"
import { red, blue, gray, charcoal } from "./message/colors"

let messages = [
	format(gray)`In ${ blue("Taciturn") }, you use ${ charcoal("units") } to complete map objectives.`,
	format(gray)`The goal for this map is to ${ red("defeat all enemy units") }.`,
	format(gray)`Let's begin by selecting one of ${ blue("your units") }.`,
]

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
				waiting: false,
				box: null
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
		let text = view.state.text
		if (!text.waiting) {
			text.box = text.render(true)
			text.waiting = true
		} else if (text.index + 1 < messages.length) {
			text.waiting = false
			text.index++
			text.time = view.state.time
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
	const width = (canvas.width > 240 ? canvas.width * 0.75 : canvas.width) - margin * 2
	let text = view.state.text
	let message = messages[text.index]
	let t = view.state.time - text.time
	let d = length(message)
	if (!t) {
		text.render = DialogueBox(message, "System", fonts, width)
		text.box = text.render()
	} else if (!text.waiting) {
		if (width !== text.box.width) {
			text.render = DialogueBox(message, "System", fonts, width)
			text.box = text.render(t)
		} else {
			let box = text.render()
			if (box) {
				text.box = box
			} else {
				text.waiting = true
			}
		}
	} else {
		if (width !== text.box.width) {
			text.render = DialogueBox(message, "System", fonts, width)
			text.box = text.render(true)
		}
		let arrow = view.sprites.arrow
		let context = text.box.getContext("2d")
		let p = (d - t) % 30 / 30
		let o = Math.round(Math.cos(Math.PI * 2 * p))
		let x = text.box.width - arrow.width - 10
		let y = text.box.height - arrow.height - 10
		context.fillStyle = "white"
		context.fillRect(x, y - 1, arrow.width + 1, arrow.height + 3)
		context.globalAlpha = 0.25
		context.drawImage(arrow, x + 1, y + o + 1)
		context.drawImage(arrow, x, y + o + 1)
		context.globalAlpha = 1
		context.drawImage(arrow, x, y + o)
	}
	context.drawImage(text.box, Math.round(canvas.width / 2 - width / 2), canvas.height - text.box.height - margin)
}
