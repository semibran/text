import Canvas from "../../lib/canvas"
import renderText from "./text"
import renderBox from "./box"
import splitMessage from "../message/split"
import { recolor } from "./font"
import * as colors from "./colors"

const padding = 10

export default function DialogueBox(message, speaker, fonts, width) {
  let font = fonts.normal
  let lines = splitMessage(message, font, width - padding * 2).slice(0, 2)
  let height = font.data.spacing.line + font.data.charsize.height * 2 + padding * 2
  let box = renderBox(width, height)
  let label = (_ => {
    let text = renderText(speaker, fonts.smallcapsBold)
    let box = renderBox(text.width + 6, text.height + 6, colors.charcoal).getContext("2d")
    box.drawImage(text, 3, 3)
    return box.canvas
  })()
  let textbox = Canvas(box.width, box.height + label.height - 3)
  textbox.drawImage(box, 0, label.height - 3)
  textbox.drawImage(label, padding, 0)
  let l = 0 // line number
  let t = 0 // token index
  let c = 0 // char index
  let i = 0 // iteration #
  let x = padding
  let y = padding + label.height - 3
  let done = false
  return function renderDialogueBox(iters) {
    if (done) return null
    let line = lines[l]
    let token = line[t]
    let char = token.text[c]
    if (char === " ") {
			x += font.data.spacing.word
		} else {
      let cache = recolor(font, token.color)
      let image = cache[char]
      if (image) {
        textbox.globalAlpha = 0.25
    		textbox.drawImage(image, x + 1, y + 1)
    		textbox.drawImage(image, x, y + 1)
    		textbox.drawImage(image, x + 1, y)
        textbox.globalAlpha = 1
    		textbox.drawImage(image, x, y)
    		x += image.width + font.data.spacing.char
      }
    }
    i++
    c++
    if (c === token.text.length) {
      t++
      c = 0
      if (t === line.length) {
        l++
        t = 0
        x = padding
        y += font.data.charsize.height + font.data.spacing.line
        if (l === lines.length) {
          done = true
        }
      }
    }
    if (iters === true || i < iters) {
      renderDialogueBox(iters)
    }
    return textbox.canvas
  }
}
