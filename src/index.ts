const _exec = RegExp.prototype.exec

interface RegRxpCall {
  duration: number
  string?: string
}

interface RegexpInfo {
  regex: RegExp,
  calls: RegRxpCall[]
}

const map = new Map<RegExp, RegexpInfo>()

RegExp.prototype.exec = function(string) {

  if (!map.has(this)) {
    map.set(this, {
      regex: this,
      calls: []
    })
  }
  const info = map.get(this)
  const start = performance.now()
  const result = _exec.call(this, string)  
  const end = performance.now()
  const duration = end - start

  info.calls.push({
    string,
    duration
  })
  return result
}

const regex = /play(123)/

const regex1 = /(a|b|c)+/i
const regex2 = /(a|b|c)+/

regex.test('play123')

'play456'.match(regex)

// 'play789'.replace(regex, 'abc')

regex1.test('abc')
regex2.test('ABC')


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

console.dir(map, { depth: 2 })
