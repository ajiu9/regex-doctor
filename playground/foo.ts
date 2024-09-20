
const regex = /play\(\d+\)/

// const regex1 = /(a|b|c)+/i
// const regex2 = /(a|b|c)+/

regex.test('play(123)')
regex.test('play(123)')

// 'play456'.match(regex)

// 'play789'.replace(regex, 'abc')

// regex1.test('abc')
// regex2.test('ABC')
const foo1 = new RegExp('foo')

const regFoo = /foo/

function foo (str: string) {
  return str.match(regFoo)
}

foo('foo')
foo('foo')
foo('foo')
foo('foo')
foo('foo')
foo('foo')
