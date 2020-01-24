import sourcemap from "../../dist/tmp/sprites.json"
import disassemble from "../../lib/disassemble"
import extract from "img-extract"
import Canvas from "../../lib/canvas"
import fonts from "../fonts"
import * as pixels from "../../lib/pixels"
import * as palette from "./colors"

export default function normalize(spritesheet) {
	let images = disassemble(spritesheet, sourcemap)
	let sprites = { fonts: {} }
	for (let id in fonts) {
		let font = fonts[id]
		let typeface = images[id]
		sprites.fonts[id] = Font(typeface, font)
	}
	return sprites
}

function makeCharmap(image, props, color) {
	let charmap = {}
	let cols = image.width / props.cellsize.width
	let rows = image.height / props.cellsize.height
	if (color) {
		image = pixels.toImage(pixels.replace(pixels.fromImage(image), palette.white, color))
	}
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let char = props.layout[y][x]
			if (!char) continue
			let size = {
				width: props.charsize.width,
				height: props.charsize.height
			}
			let offsets = props.exceptions[char]
			for (let axis in offsets) {
				size[axis] = offsets[axis]
			}
			charmap[char] = extract(image, x * props.cellsize.width, y * props.cellsize.height, size.width, size.height)
		}
	}
	return charmap
}

function Font(image, props) {
	let charmap = makeCharmap(image, props)
	let colormap = { [palette.white]: charmap }

	function split(content, width) {
		let lines = []
		let space = 0
		let split = 0
		let x = 0
		for (let i = 0; i < content.length; i++) {
			let char = content[i]
			let next = x
			if (char === " ") {
				next = x + props.spacing.word
				space = i
			} else {
				let image = charmap[char]
				if (!image) image = charmap[char.toUpperCase()]
				if (!image) continue
				next = x + image.width + props.spacing.char
			}
			if (next > width) {
				let line = char
				if (space) {
					line = content.slice(split, space)
					split = space + 1
				} else if (i > split) {
					line = content.slice(split, i)
					split = i
				} else {
					split = i + 1
				}
				lines.push(line)
				i = split
				x = 0
			} else {
				x = next
			}
		}
		let line = content.slice(split, content.length)
		if (line.length) {
			lines.push(line)
		}
		return lines
	}

	function findWidth(content) {
		let width = 0
		for (let i = 0; i < content.length; i++) {
			let char = content[i]
			if (char === " ") {
				width += props.spacing.word
				continue
			}
			let image = charmap[char]
			if (!image) image = charmap[char.toUpperCase()]
			if (!image) continue
			width += image.width
			if (i < content.length - 1) {
				width += props.spacing.char
			}
		}
		return width
	}

	function Text(content, color, width) {
		if (!color) {
			color = palette.white
		}
		let charmap = colormap[color]
		if (!charmap) {
			charmap = colormap[color] = makeCharmap(image, props, color)
		}
		if (!width) {
			width = findWidth(content)
		}
		let text = Canvas(width, props.cellsize.height)
		let x = 0
		for (let i = 0; i < content.length; i++) {
			let char = content[i]
			if (char === " ") {
				x += props.spacing.word
				continue
			}
			let image = charmap[char]
			if (!image) image = charmap[char.toUpperCase()]
			if (!image) continue
			text.drawImage(image, x, 0)
			x += image.width + props.spacing.char
		}
		return text.canvas
	}

	function TextMulti(content, color, width) {
		let lines = split(content, width)
		let height = props.cellsize.height * lines.length + props.spacing.line * (lines.length - 1)
		let text = Canvas(width, height)
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i]
			text.drawImage(Text(line, color, width), 0, i * (props.cellsize.height + props.spacing.line))
		}
		return text.canvas
	}

	return { Text, TextMulti }
}
