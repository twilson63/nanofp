import assert from 'assert'

export const curry = function(fn) {
  assert.equals(typeof fn, 'function')
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
  assert.equals(isNil(v), false)
  return !v
}

export const identity = function(v) {
  assert.equals(isNil(v), false)
  return v
}

export const always = function(v) {
  assert.equals(isNil(v), false)
  return function() {
    return v
  }
}

export const equals = curry((a, b) => a === b)
export const prop = curry(function(p, obj) {
  assert.equals(type(p), 'String')
  assert.equals(type(obj), 'Object')
  return obj[p]
})

export const reduce = curry(function(fn, v, list) {
  assert.equals(type(fn), 'Function')
  assert.equals(type(list), 'Array')

  return list.reduce(fn, v)
})

export const map = curry(function(fn, list) {
  assert.equals(type(fn), 'Function')
  assert.equals(type(list), 'Array')
  return list.map(fn, list)
})
export const filter = curry(function(fn, list) {
  assert.equals(type(fn), 'Function')
  assert.equals(type(list), 'Array')
  return list.filter(fn, list)
})

const invoke = function(v, fn) {
  assert.equals(type(fn), 'Function')
  return fn(v)
}
export const compose = function(...fns) {
  // should be array of unairy functions
  map(function(fn) {
    return assert.equals(type(fn))
  }, fns)

  return function(v) {
    return reduce(invoke, v, fns.reverse())
  }
}

export const concat = function(...arrs) {
  map(function(arr) {
    return assert.equals(type(arr), 'Array')
  }, arrs)

  return reduce((a, b) => [...a, ...b], [], arrs)
}

export const path = curry(function(keys, obj) {
  assert.equals(type(keys), 'Array')
  assert.equals(type(obj), 'Object')
  return reduce((o, p) => o[p], obj, keys))
}

export const pluck = curry( function(key, list) {
  assert.equals(type(key), 'String')
  assert.equals(type(list), 'Array')
  return map(prop(key), list))
}

export const contains = curry(function(exp, source) {
  assert.equals(type(source), 'String')
  const reg = new RegExp(`${exp}`, 'i')
  return reg.test(source)
})
export const noop = () => null
// declarative expression for true && <h1>Beep</h1>
export const asif = curry(function(compare, success) {
  return function(...args) {
    return compare.apply(null, args) ? success.apply(null, args) : null
  }
})
// ifThen(equals('Beep'), (v) => <h1>{v}</h1>)(this.state.foo)

export const ifElse = curry(function(compare, success, failure) {
  assert.equals(type(compare), 'Function')
  assert.equals(type(success), 'Function')
  assert.equals(type(failure), 'Function')

  return function(...args) {
    return compare(...args)
      ? success(...args)
      : failure(...args)
  }
})

export const merge = function(...objs) {
  map(function (o) {
    assert.equals(type(o), 'Object')
  }, objs)
  return Object.assign(...objs)
}
export const keys = function (obj) {
  assert.equals(type(obj), 'Object')
  return Object.keys(obj)
}

export const assoc = function (k, v, obj) {
  assert.equals(type(obj), 'Object')
  assert.equals(type(k), 'String')
  
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
