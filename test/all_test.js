import { all } from '../'
import test from 'tape'

test('all', t => {
  const isFive = x => x === 5
  const isString = x => x === 'foo'
  const isBool = x => x === false
  t.equals(all(isFive, [3, 5, 5, 5]), false)
  t.equals(all(isFive, [5, 5, 5, 5]), true)
  t.equals(all(isString, ['foo', 'foo', 'foo', 'foo']), true)
  t.equals(all(isString, ['foo', 'foo', 'foo', 'Foo']), false)
  t.equals(all(isBool, [false, false, false, false]), true)
  t.equals(all(isBool, [false, false, true, false]), false)
  t.end()

})
