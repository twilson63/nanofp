import { asif, equals, identity } from '../'
import test from 'tape'

test('asif', t => {
  const x = asif(equals('foo'), identity)
  t.equals(x('foo'), 'foo')
  t.equals(x('bar'), null)
  t.end()
})
