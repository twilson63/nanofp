import { map } from '../'
import test from 'tape'

test('map', t => {
  t.plan(2)
  const add = a => a + 1
  t.deepEquals(map(add, [1, 2, 3, 4, 5]), [2, 3, 4, 5, 6])
  t.deepEquals(map(add)([1, 2, 3, 4, 5]), [2, 3, 4, 5, 6])
})
