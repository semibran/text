import * as colors from "./colors"
import makeCharmap from "./charmap"

export default function Font(image, data) {
	let charmap = makeCharmap(image, data)
	return {
		image: image,
		data: data,
		cache: {
      default: charmap,
      [colors.white]: charmap
		}
	}
}

export function recolor(font, color) {
  if (!font.cache[color]) font.cache[color] = makeCharmap(font.image, font.data, color)
  return font.cache[color]
}
