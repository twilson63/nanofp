const fillChar = (char, len) => {
  var str = ""
  for (var i = 0; i < len; i++) {
    str += char
  }
  return str
}

const wrapString = (str, maxLength, innerChar, outerChar, newLine) => {
  const checkStr = str || innerChar
  const maxLen = maxLength - outerChar.length * 2 - innerChar.length * 2
  const nl = newLine ? "\n" : ""
  
  var strArr = [];
  for (var i = 0; i < Math.ceil(checkStr.length / maxLen); i++) {
    strArr.push(checkStr.substr(i * maxLen, maxLen).trim())
    strArr[i] = (i !== 0 ? "\n" : "") + outerChar + innerChar + strArr[i] + fillChar(innerChar, maxLen - strArr[i].length) + innerChar + outerChar
  }
  
  return strArr.join("") + nl
}

const verify = function(a, b, name) {
  const outerChar = "*"
  const innerChar = " "
  const linkStr = `https://github.com/twilson63/nanofp/blob/master/docs.md#${name || 'undefined'}`
  const w = linkStr.length + outerChar.length * 2 + innerChar.length * 2
  
  if (a !== b) {
    throw new Error(
      wrapString(outerChar, w, outerChar, outerChar, true) +
      wrapString(`nanofp Error: Invalid argument for the function ${name || 'undefined'}`, w, innerChar, outerChar, true) +
      wrapString(outerChar, w, outerChar, outerChar, true) +
      wrapString(`It looks like you may have passed an invalid argument`, w, innerChar, outerChar, true) +
      wrapString(`This function was looking for an input of type ${b}`, w, innerChar, outerChar, true) +
      wrapString(innerChar, w, innerChar, outerChar, true) +
      wrapString(`For more information visit:`, w, innerChar, outerChar, true) +
      wrapString(innerChar, w, innerChar, outerChar, true) +
      wrapString(linkStr, w, innerChar, outerChar, true) +
      wrapString(innerChar, w, innerChar, outerChar, true) +
      wrapString(outerChar, w, outerChar, outerChar, false)
    )
  }
  return undefined
}

export const curry = function(fn) {
  verify(typeof fn, 'function', 'curry')
  return function(...args) {
    return _curry(fn.length, args, fn)
  }
}

export const type = curry(
  val =>
    val === null
      ? 'Null'
      : val === undefined
        ? 'Undefined'
        : Object.prototype.toString.call(val).slice(8, -1)
)

export const and = curry((a, b) => a && b)
export const or = curry((a, b) => a || b)

export const isNil = function(v) {
  return v === null || v === undefined
}

export const not = function(v) {
  verify(isNil(v), false, 'not')
  return !v
}

export const identity = function(v) {
  verify(isNil(v), false, 'identity')
  return v
}

export const always = function(v) {
  verify(isNil(v), false, 'always')
  return function() {
    return v
  }
}

export const equals = curry((a, b) => a === b)
export const prop = curry((p, obj) => {
  verify(type(p), 'String', 'prop')
  verify(type(obj), 'Object', 'prop')
  return obj[p]
})

export const all = curry((fn, arr) =>
  equals(prop('length', filter(fn, arr)), prop('length', arr))
)

export const reduce = curry((fn, v, list) => {
  verify(type(fn), 'Function', 'reduce')
  verify(type(list), 'Array', 'reduce')

  return list.reduce(fn, v)
})

export const map = curry((fn, list) => {
  verify(type(fn), 'Function', 'map')
  verify(type(list), 'Array', 'map')
  return list.map(fn, list)
})
export const filter = curry((fn, list) => {
  verify(type(fn), 'Function', 'filter')
  verify(type(list), 'Array', 'filter')
  return list.filter(fn, list)
})

const invoke = function(v, fn) {
  verify(type(fn), 'Function', 'invoke')
  return fn(v)
}

export const compose = function(...fns) {
  // should be array of unairy functions
  map(fn => verify(type(fn), 'Function', 'compose'), fns)

  return function(v) {
    return reduce(invoke, v, fns.reverse())
  }
}

export const concat = function(...arrs) {
  map(arr => verify(type(arr), 'Array', 'concat'), arrs)

  return reduce((a, b) => [...a, ...b], [], arrs)
}

export const path = curry((keys, obj) => {
  verify(type(keys), 'Array', 'path')
  verify(type(obj), 'Object', 'path')
  return reduce((o, p) => o[p], obj, keys)
})

export const pluck = curry((key, list) => {
  verify(type(key), 'String', 'pluck')
  verify(type(list), 'Array', 'pluck')

  return map(prop(key), list)
})

export const contains = curry((exp, source) => {
  verify(type(source), 'String', 'contains')
  const reg = new RegExp(`${exp}`, 'i')
  return reg.test(source)
})

export const noop = () => null
// declarative expression for true && <h1>Beep</h1>
export const asif = curry((compare, success) => {
  verify(type(compare), 'Function', 'asif')
  verify(type(success), 'Function', 'asif')

  return function(...args) {
    return compare(...args) ? success(...args) : null
  }
})
// ifThen(equals('Beep'), (v) => <h1>{v}</h1>)(this.state.foo)

export const ifElse = curry((compare, success, failure) => {
  verify(type(compare), 'Function', 'ifElse')
  verify(type(success), 'Function', 'ifElse')
  verify(type(failure), 'Function', 'ifElse')

  return function(...args) {
    return compare(...args) ? success(...args) : failure(...args)
  }
})

export const merge = function(...objs) {
  map(o => {
    verify(type(o), 'Object', 'merge')
  }, objs)
  return Object.assign(...objs)
}

export const keys = function(obj) {
  verify(type(obj), 'Object', 'keys')
  return Object.keys(obj)
}

export const values = function(obj) {
  verify(type(obj), 'Object', 'values')
  return Object.values(obj)
}

export const assoc = function(k, v, obj) {
  verify(type(obj), 'Object', 'assoc')
  verify(type(k), 'String', 'assoc')

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
