import * as pixels from "./pixels"

export default function replace(image, oldColor, newColor) {
  return pixels.toImage(pixels.replace(pixels.fromImage(image), oldColor, newColor))
}
