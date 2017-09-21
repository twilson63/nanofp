import { ifElse, equals, identity, always } from '../'
import test from 'tape'

test('ifElse', t => {
  const x = ifElse(equals('foo'), identity, always('bar'))
  t.equals(x('foo'), 'foo')
  t.equals(x('bar'), 'bar')
  t.end()
})
