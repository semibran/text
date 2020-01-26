import splitMessage from "./split"
import makeCharmap from "../view/charmap"
import findTextWidth from "../view/textwidth"
import Canvas from "../../lib/canvas"

// render a message. ultimately whether this
// function draws characters or tokens is
// irrelevant as its purpose is to abstract
// away those kinds of details.
export default function renderMessage(message, font, width) {
	if (!width) { // one line (simple case)
		return renderLine(message, font, width)
	}
	let lines = splitMessage(message, font, width)
	let height = font.data.charsize.height * lines.length + font.data.spacing.line * (lines.length - 1) + (font.data.cellsize.height - font.data.charsize.height)
	let text = Canvas(width, height)
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i]
		text.drawImage(renderLine(line, font, width), 0, i * (font.data.charsize.height + font.data.spacing.line))
	}
	return text.canvas
}

function renderLine(message, font, width) {
	// ensure all required colors are cached
	let colors = []
	for (let { color } of message) {
		if (!color) continue
		if (!font.cache[color]) {
			font.cache[color] = makeCharmap(font.image, font.data, color)
		}
	}
	if (!width) {
		width = findTextWidth(message, font)
	}
	let text = Canvas(width, font.data.cellsize.height)
	let x = 0
	for (let token of message) {
		for (let char of token.text) {
			if (char === " ") {
				x += font.data.spacing.word
				continue
			}
			let cache = font.cache[token.color] || font.cache.default
			let image = cache[char]
			if (!image) image = cache[char.toUpperCase()]
			if (!image) continue
			text.drawImage(image, x, 0)
			x += image.width + font.data.spacing.char
		}
	}
	return text.canvas
}
