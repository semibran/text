import sourcemap from "../../dist/tmp/sprites.json"
import disassemble from "../../lib/disassemble"
import fonts from "../fonts"
import Font from "../view/font"

export default function normalize(spritesheet) {
	let images = disassemble(spritesheet, sourcemap)
	let sprites = { fonts: {} }
	for (let id in fonts) {
		let data = fonts[id]
		let image = images[id]
		sprites.fonts[id] = Font(image, data)
	}
	return sprites
}
