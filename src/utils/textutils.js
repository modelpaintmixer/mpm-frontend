/*
 * Various text-oriented utils that are used in multiple places.
 */

const sanitizeEmail = email => {
  const [user, host] = email.split("@")
  let hostparts = host.split(".")
  let tld = hostparts.pop()
  let cleanparts = hostparts.map(str => str.replace(/./g, "*"))

  let cleanhost = cleanparts.join(".") + `.${tld}`

  return `${user}@${cleanhost}`
}

export { sanitizeEmail }
