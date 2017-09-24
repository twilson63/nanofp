const verify = function(a, b, name) {
  if (a !== b) {
    throw new Error(
      `Invalid argument passed to ${name || 'function'}, it should be a ${b}`
    )
  }
  return undefined
}

export const curry = function(fn) {
  verify(typeof fn, 'function', 'nanofp.curry')
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
  verify(isNil(v), false, 'nanofp.not')
  return !v
}

export const identity = function(v) {
  verify(isNil(v), false, 'nanofp.identity')
  return v
}

export const always = function(v) {
  verify(isNil(v), false, 'nanofp.always')
  return function() {
    return v
  }
}

export const equals = curry((a, b) => a === b)
export const prop = curry(function(p, obj) {
  verify(type(p), 'String', 'nanofp.prop')
  verify(type(obj), 'Object', 'nanofp.prop')
  return obj[p]
})

export const reduce = curry(function(fn, v, list) {
  verify(type(fn), 'Function', 'nanofp.reduce')
  verify(type(list), 'Array', 'nanofp.reduce')

  return list.reduce(fn, v)
})

export const map = curry(function(fn, list) {
  verify(type(fn), 'Function', 'nanofp.map')
  verify(type(list), 'Array', 'nanofp.map')
  return list.map(fn, list)
})
export const filter = curry(function(fn, list) {
  verify(type(fn), 'Function', 'nanofp.filter')
  verify(type(list), 'Array', 'nanofp.filter')
  return list.filter(fn, list)
})

const invoke = function(v, fn) {
  verify(type(fn), 'Function', 'nanofp.invoke')
  return fn(v)
}

export const compose = function(...fns) {
  // should be array of unairy functions
  map(function(fn) {
    return verify(type(fn), 'Function', 'nanofp.compose')
  }, fns)

  return function(v) {
    return reduce(invoke, v, fns.reverse())
  }
}

export const concat = function(...arrs) {
  map(function(arr) {
    return verify(type(arr), 'Array', 'nanofp.concat')
  }, arrs)

  return reduce((a, b) => [...a, ...b], [], arrs)
}

export const path = curry(function(keys, obj) {
  verify(type(keys), 'Array', 'nanofp.path')
  verify(type(obj), 'Object', 'nanofp.path')
  return reduce((o, p) => o[p], obj, keys)
})

export const pluck = curry(function(key, list) {
  verify(type(key), 'String', 'nanofp.pluck')
  verify(type(list), 'Array', 'nanofp.pluck')

  return map(prop(key), list)
})

export const contains = curry(function(exp, source) {
  verify(type(source), 'String', 'nanofp.contains')
  const reg = new RegExp(`${exp}`, 'i')
  return reg.test(source)
})

export const noop = () => null
// declarative expression for true && <h1>Beep</h1>
export const asif = curry(function(compare, success) {
  verify(type(compare), 'Function', 'nanofp.asif')
  verify(type(success), 'Function', 'nanofp.asif')

  return function(...args) {
    return compare(...args) ? success(...args) : null
  }
})
// ifThen(equals('Beep'), (v) => <h1>{v}</h1>)(this.state.foo)

export const ifElse = curry(function(compare, success, failure) {
  verify(type(compare), 'Function', 'nanofp.ifElse')
  verify(type(success), 'Function', 'nanofp.ifElse')
  verify(type(failure), 'Function', 'nanofp.ifElse')

  return function(...args) {
    return compare(...args) ? success(...args) : failure(...args)
  }
})

export const merge = function(...objs) {
  map(function(o) {
    verify(type(o), 'Object', 'nanofp.merge')
  }, objs)
  return Object.assign(...objs)
}

export const keys = function(obj) {
  verify(type(obj), 'Object', 'nanofp.keys')
  return Object.keys(obj)
}

export const values = function(obj) {
  verify(type(obj), 'Object', 'nanofp.values')
  return Object.values(obj)
}

export const assoc = function(k, v, obj) {
  verify(type(obj), 'Object', 'nanofp.assoc')
  verify(type(k), 'String', 'nanofp.assoc')

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
