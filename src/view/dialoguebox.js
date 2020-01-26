import Canvas from "../../lib/canvas"
import renderTextBox from "./textbox"
import renderText from "./text"
import renderBox from "./box"
import * as colors from "./colors"

export default function renderDialogueBox(message, speaker, sprites, width) {
  let textbox = renderTextBox(message, sprites.fonts.normal, width, 2)
  let label = renderText(speaker, sprites.fonts.smallcapsBold)
  let box = renderBox(label.width + 6, label.height + 6, colors.charcoal).getContext("2d")
  box.drawImage(label, 3, 3)

  let dialoguebox = Canvas(textbox.width, textbox.height + box.canvas.height - 3)
  dialoguebox.drawImage(textbox, 0, dialoguebox.canvas.height - textbox.height)
  dialoguebox.drawImage(box.canvas, 10, 0)
  return dialoguebox.canvas
}
