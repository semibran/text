export function create(sprites) {
	return {
		sprites: sprites,
		element: document.createElement("canvas")
	}
}

export function render(view, state) {
	let canvas = view.element
	let context = canvas.getContext("2d")
	let a = view.sprites.fonts.normal("Hello world")
	let b = view.sprites.fonts.bold("Hello world")
	let c = view.sprites.fonts.smallcaps("Hello world")
	canvas.width = Math.max.call(Math, a.width, b.width, c.width)
	canvas.height = a.height + 1 + b.height + 1 + c.height
	context.fillStyle = "black"
	context.fillRect(0, 0, canvas.width, canvas.height)
	context.drawImage(a, 0, 0)
	context.drawImage(b, 0, a.height + 1)
	context.drawImage(c, 0, a.height + 1 + b.height + 1)
}
