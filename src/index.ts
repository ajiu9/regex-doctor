const _exec = RegExp.prototype.exec

RegExp.prototype.exec = function(str) {

  const result = _exec.call(this, str)
  return result
  
}

const regex = /play(123)/

console.log(regex.test('play123'))

console.log('play456'.match(regex))

console.log('play789'.replace(regex, 'abc'))


