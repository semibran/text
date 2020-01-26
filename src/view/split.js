function splitText(content, width) {
  let lines = []
  let space = 0
  let split = 0
  let x = 0
  for (let i = 0; i < content.length; i++) {
    let char = content[i]
    let next = x
    if (char === " ") {
      next = x + props.spacing.word
      space = i
    } else {
      let image = charmap[char]
      if (!image) image = charmap[char.toUpperCase()]
      if (!image) continue
      next = x + image.width + props.spacing.char
    }
    if (next > width) {
      let line = char
      if (space) {
        line = content.slice(split, space)
        split = space + 1
      } else if (i > split) {
        line = content.slice(split, i)
        split = i
      } else {
        split = i + 1
      }
      lines.push(line)
      i = split
      x = 0
    } else {
      x = next
    }
  }
  let line = content.slice(split, content.length)
  if (line.length) {
    lines.push(line)
  }
  return lines
}
