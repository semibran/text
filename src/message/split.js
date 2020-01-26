import { slice, at } from "./"

export default function splitMessage(message, font, width) {
  let lines = []
  let space = 0
  let split = 0
  let x = 0
  let i = 0
  for (let t = 0; t < message.length; t++) {
    let token = message[t]
    for (let c = 0; c < token.text.length; c++) {
      let char = token.text[c]
      let next = x
      if (char === " ") { // char is space. add on space width
        next += font.data.spacing.word
        space = i
      } else { // char is not a space. add on char width + kerning
        let cache = font.cache.default
        let image = cache[char]
        if (!image) image = cache[char.toUpperCase()]
        if (!image) continue
        let exception = font.data.exceptions[char]
        next += image.width + font.data.spacing.char + (exception && exception.offset || 0)
      }

      if (next <= width) {
        x = next // new char fits. add and proceed as normal
      } else { // projected width exceeds width threshold. inject newline
        let line = null
        if (space) { // slice from beginning of line to last found space
          line = slice(message, split, space)
          split = space + 1 // mark beginning of line starting from first non-space character found (NOTE: space chains not handled!)
          space = 0 // reset space
        } else if (i > split) { // no space found. slice from beginning of line to current position
          line = slice(message, split, i)
          split = i
        } else { // last resort - split 1 char wide
          line = slice(message, split, split + 1)
          split = i + 1
        }
        lines.push(line)
        i = split
        let pos = at(message, i)
        if (!pos) {
          break
        }
        t = pos.token
        c = pos.index
        x = 0
      }
      i++
    }
  }
  let line = slice(message, split, i)
  if (line.length) {
    lines.push(line)
  }
  return lines
}
