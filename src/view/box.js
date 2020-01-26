import Canvas from "../../lib/canvas"
import rgb from "../../lib/rgb"

export default function Box(width, height, color) {
	let box = Canvas(width, height)
	box.fillStyle = color ? rgb(...color) : "white"
	box.fillRect(1, 0, width - 2, height)
	box.fillRect(0, 1, width, height - 2)
	return box.canvas
}
