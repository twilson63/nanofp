import { filter } from '../'
import test from 'tape'

test('filter', t => {
  t.plan(2)
  const isOdd = a => a % 2 === 1
  t.deepEquals(filter(isOdd, [1, 2, 3, 4, 5]), [1, 3, 5])
  t.deepEquals(filter(isOdd)([1, 2, 3, 4, 5]), [1, 3, 5])
})
