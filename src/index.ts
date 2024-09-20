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

function start() {
  RegExp.prototype.exec = function(string) {

    if (!map.has(this)) {
      map.set(this, {
        regex: this,
        calls: []
      })
    }
    const info = map.get(this)!
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

  function getTrace () {
    return new Error().stack
  }

  class MyRegExp extends RegExp {
    constructor(pattern: RegExp | string, flags?: string) {
      console.log(getTrace()?.split('\n'))
      super(pattern, flags)
    }
  }

  globalThis.RegExp = MyRegExp as any

  // const _constructor = RegExp.prototype.constructor
  // RegExp.prototype.constructor = function(pattern: RegExp | string, flags?: string) {
  //   console.log('new RegExp', pattern, flags)
  //   return _constructor.call(this, pattern, flags)
  // }
}

start()



await import('../playground/foo')



// console.dir(map, { depth: 1 })
// console.log(map)

