import Canvas from "../lib/canvas"

export function create(width, height, sprites) {
	let view = {
		width, height,
		scale: 1,
		sprites: sprites,
		element: document.createElement("canvas")
	}

	function resize() {
		let scaleX = Math.max(1, Math.floor(window.innerWidth / width))
		let scaleY = Math.max(1, Math.floor(window.innerHeight / height))
		view.scale = Math.min(scaleX, scaleY)
	}

	resize()
	window.addEventListener("resize", _ => {
		resize()
		render(view)
	})

	return view
}

export function render(view, state) {
	let canvas = view.element
	let context = canvas.getContext("2d")
	canvas.width = Math.ceil(window.innerWidth / view.scale)
	canvas.height = Math.ceil(window.innerHeight / view.scale)
	canvas.style.transform = `scale(${view.scale})`
	context.fillStyle = "black"
	context.fillRect(0, 0, canvas.width, canvas.height)

	let viewport = Canvas(view.width, view.height)
	let a = view.sprites.fonts.normal("Hector received 2 damage.")
	let b = view.sprites.fonts.bold("Soldier, Bandit, Knight")
	let c = view.sprites.fonts.smallcaps("SYSTEM . TUTORIAL")
	viewport.drawImage(a, 0, 0)
	viewport.drawImage(b, 0, a.height + 1)
	viewport.drawImage(c, 0, a.height + 1 + b.height + 1)
	context.drawImage(viewport.canvas,
		Math.round(canvas.width / 2 - view.width / 2),
		Math.round(canvas.height / 2 - view.height / 2)
	)
}
