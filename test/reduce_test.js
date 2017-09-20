import { reduce } from '../'
import test from 'tape'

test('reduce', t => {
  t.plan(2)
  const add = (a, b) => a + b
  t.equals(reduce(add, 0, [1, 2, 3, 4, 5]), 15)
  t.equals(reduce(add)(0)([1, 2, 3, 4, 5]), 15)
})
