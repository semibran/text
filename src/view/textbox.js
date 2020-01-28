import renderBox from "./box"
import { render as renderMessage } from "../message"

const padding = 10
const padding = 10

export default function renderTextBox(message, font, width, rows) {
  let baseline = (font.data.cellsize.height - font.data.charsize.height)
  let height = font.data.charsize.height * rows + font.data.spacing.line * (rows - 1) + padding * 2
  let box = renderBox(width, height).getContext("2d")
  let text = renderMessage(message, font, width - padding * 2)
  box.globalAlpha = 0.25
  box.drawImage(text, padding + 1, padding + 1)
  box.drawImage(text, padding + 1, padding)
  box.drawImage(text, padding, padding + 1)
  box.globalAlpha = 1
  box.drawImage(text, padding, padding)
  return box.canvas
}
