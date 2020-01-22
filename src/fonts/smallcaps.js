export default {
	name: "smallcaps",
	cellsize: { width: 7, height: 5 },
	charsize: { width: 6, height: 5 },
	exceptions: {
		M: { width: 7 },
		W: { width: 7 }
	},
	kerning: 1, // char spacing
	space: 4,   // word spacing
	
	layout: [
		"0123456789",
		"ABCDEFGHIJ",
		"KLMNOPQRST",
		"UVWXYZ"
	]
}
