export default {
	name: "smallcaps",
	cellsize: { width: 7, height: 5 },
	charsize: { width: 6, height: 5 },
	exceptions: {
		M: { width: 7 },
		W: { width: 7 },
		",": { width: 2 },
		".": { width: 2 },
		"!": { width: 2 },
		"?": { width: 6 }
	},
	spacing: {
		char: 1,
		word: 4,
		line: 2
	},
	layout: [
		"0123456789",
		"ABCDEFGHIJ",
		"KLMNOPQRST",
		"UVWXYZ,.!?"
	]
}
