import { add } from '../'
import test from 'tape'

test('add', t => {
  t.equals(add(2, 3), 5)
  t.equals(add(-2, -3), -5)
  t.end()
})
