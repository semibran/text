import sourcemap from "../../dist/tmp/sprites.json"
import disassemble from "../../lib/disassemble"
import replace from "../../lib/img-replace"
import fonts from "../fonts"
import Font from "../view/font"
import * as colors from "../view/colors"

export default function normalize(spritesheet) {
	let images = disassemble(spritesheet, sourcemap)
	let sprites = {
		fonts: {},
		arrow: replace(images.arrow, colors.white, colors.gray)
	}
	for (let id in fonts) {
		let data = fonts[id]
		let image = images[data.name]
		sprites.fonts[id] = Font(image, data)
	}
	return sprites
}
