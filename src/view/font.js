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
