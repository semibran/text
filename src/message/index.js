export { default as render } from "./render"
export * from "./colors"

export function format(strings, ...tokens) {
	if (!strings.length && tokens.length) {
		return tokens
	}
	let result = []
	for (let i = 0; i < strings.length; i++) {
		result.push({ text: strings[i], color: null })
		if (tokens[i]) {
			result.push(tokens[i])
		}
	}
	return result
}

export function at(tokens, index) {
  for (let i = 0; i < tokens.length; i++) {
    if (index < tokens[i].text.length) {
      return { token: i, index }
    }
    index -= tokens[i].text.length
  }
}

export function slice(tokens, start, end) {
  if (!end) {
    end = start
    start = 0
  }
  if (end < start) {
    return [ { text: "", color: null } ]
  }
  let pos = at(tokens, start)
  let slice = []
  for (let i = pos.token; i < tokens.length; i++) {
    let token = { text: "", color: tokens[i].color }
    slice.push(token)
    for (let j = i === pos.token ? pos.index : 0; j < tokens[i].text.length; j++) {
      token.text += tokens[i].text[j]
      if (++start === end) {
        return slice
      }
    }
  }
  return slice
}

export function length(tokens) {
  let length = 0
  for (let token of tokens) {
    length += token.text.length
  }
  return length
}
