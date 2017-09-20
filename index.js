export const curry = fn => (...args) => _curry(fn.length, args, fn)
export const isNil = v => v == null
export const not = v => !v
export const identity = v => v
export const always = v => () => v
export const equals = curry((a, b) => a === b)
export const prop = curry((p, obj) => obj[p])
export const reduce = curry((fn, v, list) => list.reduce(fn, v))
export const map = curry((fn, list) => list.map(fn, list))
export const filter = curry((fn, list) => list.filter(fn, list))

const invoke = (v, fn) => fn(v)
export const compose = (...fns) => v => reduce(invoke, v, fns.reverse())
export const concat = (...arrs) => reduce((a, b) => [...a, ...b], [], arrs)
export const path = curry((keys, obj) => reduce((o, p) => o[p], obj, keys))
export const pluck = curry((key, list) => map(prop(key), list))
export const and = curry((a, b) => a && b)
export const or = curry((a, b) => a || b)
export const contains = curry((exp, source) => {
  const reg = new RegExp(`${exp}`, 'i')
  return reg.test(source)
})
export const noop = () => null

// ---- Internal Functions

// Core Curry Functions

function _arity(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn.apply(null, arguments)
      }
    case 1:
      return function(a0) {
        return fn.apply(null, arguments)
      }
    case 2:
      return function(a0, a1) {
        return fn.apply(null, arguments)
      }
    case 3:
      return function(a0, a1, a2) {
        return fn.apply(null, arguments)
      }

    default:
      throw new Error(
        'First argument to _arity function must be a non-negative integer no greater than four'
      )
  }
}
function _curry(length, received, fn) {
  if (length === received.length) {
    return fn.apply(null, received)
  }
  return function(...args) {
    const combined = received.concat(args)
    const left = length - combined.length
    return left <= 0
      ? fn.apply(null, combined)
      : _arity(left, _curry(length, combined, fn))
  }
}
