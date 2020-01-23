export function create(width, height, sprites) {
	return {
		width, height,
		sprites: sprites,
		element: document.createElement("canvas")
	}
}

export function render(view, state) {
	let canvas = view.element
	let context = canvas.getContext("2d")
	let a = view.sprites.fonts.normal("Hector received 2 damage.")
	let b = view.sprites.fonts.bold("Soldier, Bandit, Knight")
	let c = view.sprites.fonts.smallcaps("SYSTEM . TUTORIAL")
	canvas.width = view.width
	canvas.height = view.height
	context.fillStyle = "black"
	context.fillRect(0, 0, canvas.width, canvas.height)
	context.drawImage(a, 0, 0)
	context.drawImage(b, 0, a.height + 1)
	context.drawImage(c, 0, a.height + 1 + b.height + 1)
}
