export default {
	name: "normal",
	cellsize: { width: 7, height: 9 },
	charsize: { width: 5, height: 7 },
	exceptions: {
		1: { width: 3 },
		4: { width: 4 },
		J: { width: 4 },
		f: { width: 4 },
		g: { height: 9 },
		i: { width: 1 },
		j: { width: 3 },
		k: { width: 4 },
		l: { width: 1 },
		m: { width: 7 },
		p: { height: 9 },
		q: { height: 9 },
		t: { width: 3 },
		w: { width: 7 },
		y: { height: 9 },
		",": { width: 1, height: 8 },
		".": { width: 1 },
		"!": { width: 1 },
		"?": { width: 5 }
	},
	spacing: {
		char: 1,
		word: 2,
		line: 5
	},
	layout: [
		"0123456789",
		"ABCDEFGHIJ",
		"KLMNOPQRST",
		"UVWXYZ,.!?",
		"abcdefghij",
		"klmnopqrst",
		"uvwxyz"
	]
}
