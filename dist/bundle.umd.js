(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.nanofp = {})));
}(this, (function (exports) { 'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var curry = function curry(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _curry(fn.length, args, fn);
  };
};
var isNil = function isNil(v) {
  return v == null;
};
var not = function not(v) {
  return !v;
};
var identity = function identity(v) {
  return v;
};
var always = function always(v) {
  return function () {
    return v;
  };
};
var equals = curry(function (a, b) {
  return a === b;
});
var prop = curry(function (p, obj) {
  return obj[p];
});
var reduce = curry(function (fn, v, list) {
  return list.reduce(fn, v);
});
var map = curry(function (fn, list) {
  return list.map(fn, list);
});
var filter = curry(function (fn, list) {
  return list.filter(fn, list);
});

var invoke = function invoke(v, fn) {
  return fn(v);
};
var compose = function compose() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function (v) {
    return reduce(invoke, v, fns.reverse());
  };
};
var concat = function concat() {
  for (var _len3 = arguments.length, arrs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    arrs[_key3] = arguments[_key3];
  }

  return reduce(function (a, b) {
    return [].concat(_toConsumableArray(a), _toConsumableArray(b));
  }, [], arrs);
};
var path = curry(function (keys, obj) {
  return reduce(function (o, p) {
    return o[p];
  }, obj, keys);
});
var pluck = curry(function (key, list) {
  return map(prop(key), list);
});
var and = curry(function (a, b) {
  return a && b;
});
var or = curry(function (a, b) {
  return a || b;
});
var contains = curry(function (exp, source) {
  var reg = new RegExp('' + exp, 'i');
  return reg.test(source);
});
var noop = function noop() {
  return null;
};
// declarative expression for true && <h1>Beep</h1>
var asif = curry(function (compare, success) {
  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return compare.apply(null, args) ? success.apply(null, args) : null;
  };
});
// ifThen(equals('Beep'), (v) => <h1>{v}</h1>)(this.state.foo)

var ifElse = curry(function (compare, success, failure) {
  return function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return compare.apply(null, args) ? success.apply(null, args) : failure.apply(null, args);
  };
});
// ---- Internal Functions

// Core Curry Functions

function _arity(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.apply(null, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(null, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(null, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(null, arguments);
      };

    default:
      throw new Error('First argument to _arity function must be a non-negative integer no greater than four');
  }
}
function _curry(length, received, fn) {
  if (length === received.length) {
    return fn.apply(null, received);
  }
  return function () {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var combined = received.concat(args);
    var left = length - combined.length;
    return left <= 0 ? fn.apply(null, combined) : _arity(left, _curry(length, combined, fn));
  };
}

exports.curry = curry;
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
exports.and = and;
exports.or = or;
exports.contains = contains;
exports.noop = noop;
exports.asif = asif;
exports.ifElse = ifElse;

Object.defineProperty(exports, '__esModule', { value: true });

})));
