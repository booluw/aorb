const KEY = 'AorB!2024'

function xor(str) {
  return str
    .split('')
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ KEY.charCodeAt(i % KEY.length)))
    .join('')
}

export function encode(payload) {
  const json = JSON.stringify(payload)
  const xored = xor(json)
  return btoa(xored).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decode(slug) {
  try {
    const base64 = slug.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=')
    const xored = atob(padded)
    const json = xor(xored)
    return JSON.parse(json)
  } catch {
    return null
  }
}
