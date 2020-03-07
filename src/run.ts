import methods from './extractors/methodsBlock'

const source =
`helloWorld (): void {
  return 'Hello World!'
}

get user (): UserInfo {
  return this.$store.getters['auth/user']
}

helloName (name: string) {
  if (name) {
    return 'Hello ' + name + '!'
  } else {
    return 'Hello Nobody!'
  }
}

property: string = 'aaa'
`

const result = methods(source)

console.log()
console.log(result)
