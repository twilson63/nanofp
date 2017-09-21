import { merge } from '../'
import test from 'tape'

test('reduce', t => {
  t.plan(1)

  t.deepEquals(merge({ name: 'larry' }, { type: 'stooge' }, { born: '1915' }), {
    name: 'larry',
    type: 'stooge',
    born: '1915'
  })
})
