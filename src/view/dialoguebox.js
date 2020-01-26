import renderTextBox from "./textbox"
import renderBox from "./box"
import colors from "./colors"

export default function renderDialogueBox(sprites, message, speaker, width) {
  let textbox = renderTextBox(message, sprites.fonts.normal, width, 2)
  let label = renderText(colors.black)
  let box = renderBox(colors.black)
}
