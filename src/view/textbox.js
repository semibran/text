import renderBox from "./box"
import { render as renderMessage } from "../message"

const paddingX = 10
const paddingY = 10

export default function renderTextBox(message, font, width, rows) {
  let baseline = (font.data.cellsize.height - font.data.charsize.height)
  let height = font.data.charsize.height * rows + font.data.spacing.line * (rows - 1) + paddingY * 2
  let box = renderBox(width, height).getContext("2d")
  let text = renderMessage(message, font, width - paddingX * 2)
  box.globalAlpha = 0.25
  box.drawImage(text, paddingX + 1, paddingY + 1)
  box.drawImage(text, paddingX + 1, paddingY)
  box.drawImage(text, paddingX, paddingY + 1)
  box.globalAlpha = 1
  box.drawImage(text, paddingX, paddingY)
  return box.canvas
}
