import test from 'tape'
import { asif, equals, identity } from '../'

test('asif', t => {
  const x = asif(equals('foo'), identity)
  t.equals(x('foo'), 'foo')
  t.equals(x('bar'), null)
  t.end()
  return undefined
})
