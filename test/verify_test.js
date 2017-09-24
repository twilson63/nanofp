import test from 'tape'
import { map } from '../'

test('verify', t => {
  try {
    map('Beep', [1, 2, 3, 4])
  } catch (err) {
    t.equals(
      err.message,
      'Invalid argument passed to nanofp.map, it should be a Function'
    )
  } finally {
    t.end()
  }
})
