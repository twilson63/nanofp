(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.nanofp = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var verify = function verify(a, b, name) {
  if (a !== b) {
    throw new Error('\n*************************************************************\n* nanofp Error: Invalid argument for the function ' + (name || 'undefined') + '\n*************************************************************\n*  It looks like you may have passed an invalid argument\n*  This function was looking for a input of type ' + b + '\n*\n*  For more information visit:\n*\n*  https://github.com/twilson63/nanofp/blob/master/docs.md#' + (name || 'undefined') + '\n*\n*************************************************************\n');
  }
  return undefined;
};

var curry = function curry(fn) {
  verify(typeof fn === 'undefined' ? 'undefined' : _typeof(fn), 'function', 'curry');
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _curry(fn.length, args, fn);
  };
};

var type = curry(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

var and = curry(function (a, b) {
  return a && b;
});
var or = curry(function (a, b) {
  return a || b;
});

var isNil = function isNil(v) {
  return v === null || v === undefined;
};

var not = function not(v) {
  verify(isNil(v), false, 'not');
  return !v;
};

var identity = function identity(v) {
  verify(isNil(v), false, 'identity');
  return v;
};

var always = function always(v) {
  verify(isNil(v), false, 'always');
  return function () {
    return v;
  };
};

var equals = curry(function (a, b) {
  return a === b;
});
var prop = curry(function (p, obj) {
  verify(type(p), 'String', 'prop');
  verify(type(obj), 'Object', 'prop');
  return obj[p];
});

var reduce = curry(function (fn, v, list) {
  verify(type(fn), 'Function', 'reduce');
  verify(type(list), 'Array', 'reduce');

  return list.reduce(fn, v);
});

var map = curry(function (fn, list) {
  verify(type(fn), 'Function', 'map');
  verify(type(list), 'Array', 'map');
  return list.map(fn, list);
});
var filter = curry(function (fn, list) {
  verify(type(fn), 'Function', 'filter');
  verify(type(list), 'Array', 'filter');
  return list.filter(fn, list);
});

var invoke = function invoke(v, fn) {
  verify(type(fn), 'Function', 'invoke');
  return fn(v);
};

var compose = function compose() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  // should be array of unairy functions
  map(function (fn) {
    return verify(type(fn), 'Function', 'compose');
  }, fns);

  return function (v) {
    return reduce(invoke, v, fns.reverse());
  };
};

var concat = function concat() {
  for (var _len3 = arguments.length, arrs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    arrs[_key3] = arguments[_key3];
  }

  map(function (arr) {
    return verify(type(arr), 'Array', 'concat');
  }, arrs);

  return reduce(function (a, b) {
    return [].concat(_toConsumableArray(a), _toConsumableArray(b));
  }, [], arrs);
};

var path = curry(function (keys, obj) {
  verify(type(keys), 'Array', 'path');
  verify(type(obj), 'Object', 'path');
  return reduce(function (o, p) {
    return o[p];
  }, obj, keys);
});

var pluck = curry(function (key, list) {
  verify(type(key), 'String', 'pluck');
  verify(type(list), 'Array', 'pluck');

  return map(prop(key), list);
});

var contains = curry(function (exp, source) {
  verify(type(source), 'String', 'contains');
  var reg = new RegExp('' + exp, 'i');
  return reg.test(source);
});

var noop = function noop() {
  return null;
};
// declarative expression for true && <h1>Beep</h1>
var asif = curry(function (compare, success) {
  verify(type(compare), 'Function', 'asif');
  verify(type(success), 'Function', 'asif');

  return function () {
    return compare.apply(undefined, arguments) ? success.apply(undefined, arguments) : null;
  };
});
// ifThen(equals('Beep'), (v) => <h1>{v}</h1>)(this.state.foo)

var ifElse = curry(function (compare, success, failure) {
  verify(type(compare), 'Function', 'ifElse');
  verify(type(success), 'Function', 'ifElse');
  verify(type(failure), 'Function', 'ifElse');

  return function () {
    return compare.apply(undefined, arguments) ? success.apply(undefined, arguments) : failure.apply(undefined, arguments);
  };
});

var merge = function merge() {
  for (var _len4 = arguments.length, objs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    objs[_key4] = arguments[_key4];
  }

  map(function (o) {
    verify(type(o), 'Object', 'merge');
  }, objs);
  return Object.assign.apply(Object, objs);
};

var keys = function keys(obj) {
  verify(type(obj), 'Object', 'keys');
  return Object.keys(obj);
};

var values = function values(obj) {
  verify(type(obj), 'Object', 'values');
  return Object.values(obj);
};

var assoc = function assoc(k, v, obj) {
  verify(type(obj), 'Object', 'assoc');
  verify(type(k), 'String', 'assoc');

  return merge(obj, _defineProperty({}, k, v));
};
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
      return function () {
        return fn.apply(undefined, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(undefined, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(undefined, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(undefined, arguments);
      };

    default:
      throw new Error('First argument to _arity function must be a non-negative integer no greater than four');
  }
}

function _curry(length, received, fn) {
  if (length === received.length) {
    return fn.apply(undefined, _toConsumableArray(received));
  }
  return function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    var combined = received.concat(args);
    var left = length - combined.length;
    return left <= 0 ? fn.apply(undefined, _toConsumableArray(combined)) : _arity(left, _curry(length, combined, fn));
  };
}

exports.curry = curry;
exports.type = type;
exports.and = and;
exports.or = or;
exports.isNil = isNil;
exports.not = not;
exports.identity = identity;
exports.always = always;
exports.equals = equals;
exports.prop = prop;
exports.reduce = reduce;
exports.map = map;
exports.filter = filter;
exports.compose = compose;
exports.concat = concat;
exports.path = path;
exports.pluck = pluck;
exports.contains = contains;
exports.noop = noop;
exports.asif = asif;
exports.ifElse = ifElse;
exports.merge = merge;
exports.keys = keys;
exports.values = values;
exports.assoc = assoc;

Object.defineProperty(exports, '__esModule', { value: true });

})));
