import assert from 'assert'

export const curry = function(fn) {
  assert.equal(typeof fn, 'function')
  return function(...args) {
    return _curry(fn.length, args, fn)
  }
}

export const type = curry(function type(val) {
  return val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1)
})

export const and = curry((a, b) => a && b)
export const or = curry((a, b) => a || b)

export const isNil = function(v) {
  return v === null || v === undefined
}

export const not = function(v) {
  assert.equal(isNil(v), false)
  return !v
}

export const identity = function(v) {
  assert.equal(isNil(v), false)
  return v
}

export const always = function(v) {
  assert.equal(isNil(v), false)
  return function() {
    return v
  }
}

export const equals = curry((a, b) => a === b)
export const prop = curry(function(p, obj) {
  assert.equal(type(p), 'String')
  assert.equal(type(obj), 'Object')
  return obj[p]
})

export const reduce = curry(function(fn, v, list) {
  assert.equal(type(fn), 'Function')
  assert.equal(type(list), 'Array')

  return list.reduce(fn, v)
})

export const map = curry(function(fn, list) {
  assert.equal(type(fn), 'Function')
  assert.equal(type(list), 'Array')
  return list.map(fn, list)
})
export const filter = curry(function(fn, list) {
  assert.equal(type(fn), 'Function')
  assert.equal(type(list), 'Array')
  return list.filter(fn, list)
})

const invoke = function(v, fn) {
  assert.equal(type(fn), 'Function')
  return fn(v)
}

export const compose = function(...fns) {
  // should be array of unairy functions
  map(function(fn) {
    return assert.equal(type(fn), 'Function')
  }, fns)

  return function(v) {
    return reduce(invoke, v, fns.reverse())
  }
}

export const concat = function(...arrs) {
  map(function(arr) {
    return assert.equal(type(arr), 'Array')
  }, arrs)

  return reduce((a, b) => [...a, ...b], [], arrs)
}

export const path = curry(function(keys, obj) {
  assert.equal(type(keys), 'Array')
  assert.equal(type(obj), 'Object')
  return reduce((o, p) => o[p], obj, keys)
})

export const pluck = curry(function(key, list) {
  assert.equal(type(key), 'String')
  assert.equal(type(list), 'Array')

  return map(prop(key), list)
})

export const contains = curry(function(exp, source) {
  assert.equal(type(source), 'String')
  const reg = new RegExp(`${exp}`, 'i')
  return reg.test(source)
})

export const noop = () => null
// declarative expression for true && <h1>Beep</h1>
export const asif = curry(function(compare, success) {
  assert.equal(type(compare), 'Function')
  assert.equal(type(success), 'Function')

  return function(...args) {
    return compare(...args) ? success(...args) : null
  }
})
// ifThen(equals('Beep'), (v) => <h1>{v}</h1>)(this.state.foo)

export const ifElse = curry(function(compare, success, failure) {
  assert.equal(type(compare), 'Function')
  assert.equal(type(success), 'Function')
  assert.equal(type(failure), 'Function')

  return function(...args) {
    return compare(...args) ? success(...args) : failure(...args)
  }
})

export const merge = function(...objs) {
  map(function(o) {
    assert.equal(type(o), 'Object')
  }, objs)
  return Object.assign(...objs)
}
export const keys = function(obj) {
  assert.equal(type(obj), 'Object')
  return Object.keys(obj)
}

export const assoc = function(k, v, obj) {
  assert.equal(type(obj), 'Object')
  assert.equal(type(k), 'String')

  return merge(obj, { [k]: v })
}
// export const lens = curry((getter, setter) => {
//   return toFunctorFn => {
//     return target => {
//       return map(focus => setter(focus, target), toFunctorFn(getter(target)))
//     }
//   }
// })
// export const lensProp = k => noop
// export const set = (lensKey, value, obj) => noop

// ---- Internal Functions

// Core Curry Functions

function _arity(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn(...arguments)
      }
    case 1:
      return function(a0) {
        return fn(...arguments)
      }
    case 2:
      return function(a0, a1) {
        return fn(...arguments)
      }
    case 3:
      return function(a0, a1, a2) {
        return fn(...arguments)
      }

    default:
      throw new Error(
        'First argument to _arity function must be a non-negative integer no greater than four'
      )
  }
}
function _curry(length, received, fn) {
  if (length === received.length) {
    return fn(...received)
  }
  return function(...args) {
    const combined = received.concat(args)
    const left = length - combined.length
    return left <= 0
      ? fn(...combined)
      : _arity(left, _curry(length, combined, fn))
  }
}
