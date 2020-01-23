import sourcemap from "../../dist/tmp/sprites.json"
import disassemble from "../../lib/disassemble"
import extract from "img-extract"
import Canvas from "../../lib/canvas"
import fonts from "../fonts"
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
		image = pixels.replace(image, palette.white, color)
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
	let colormap = {
		[palette.white]: makeCharmap(image, props)
	}
	return function Text(content, color) {
		let charmap = colormap[color]
		if (!charmap) {
			charmap = colormap[color] = makeCharmap(image, props, color)
		}
		let width = 0
		let height = 0
		for (let i = 0; i < content.length; i++) {
			let char = content[i]
			if (char === " ") {
				width += props.space
				continue
			}
			let image = charmap[char]
			if (!image) image = charmap[char.toUpperCase()]
			if (!image) continue
			width += image.width
			if (i < content.length - 1) {
				width += props.kerning
			}
			if (image.height > height) {
				height = image.height
			}
		}
		let x = 0
		let text = Canvas(width, height)
		for (let i = 0; i < content.length; i++) {
			let char = content[i]
			if (char === " ") {
				x += props.space
				continue
			}
			let image = charmap[char]
			if (!image) image = charmap[char.toUpperCase()]
			if (!image) continue
			let offsets = props.exceptions[char]
			let offset = offsets ? offsets.x || 0 : 0
			text.drawImage(image, x + offset, 0)
			x += image.width + props.kerning + offset
		}
		return text.canvas
	}
}
