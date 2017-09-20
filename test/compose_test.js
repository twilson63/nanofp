import { compose, map, filter } from '../'
import test from 'tape'
import converter from 'number-to-words'

test('reduce', t => {
  t.plan(1)
  const isOdd = a => a % 2 === 1
  const data = [1, 2, 3, 4, 5, 6, 7]
  const result = compose(map(converter.toWords), filter(isOdd))(data)
  t.deepEquals(result, ['one', 'third', 'fifth', 'seventh'])
})
