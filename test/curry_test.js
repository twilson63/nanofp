import { curry } from '../'
import test from 'tape'

test('curry', t => {
  t.plan(4)
  const add = curry(function(a, b, c) {
    return a + b + c
  })
  t.equals(add(1)(2)(3), 6)
  t.equals(add(1, 2, 3), 6)
  t.equals(add(1, 2)(3), 6)
  t.equals(add(1)(2, 3), 6)
})
