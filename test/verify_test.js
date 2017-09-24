import test from 'tape'
import { map } from '../'

test('verify', t => {
  try {
    map('Beep', [1, 2, 3, 4])
  } catch (err) {
    t.equals(
      err.message,
      `
*************************************************************
* nanofp Error: Invalid argument for the function map
*************************************************************
*  It looks like you may have passed an invalid argument
*  This function was looking for a input of type Function
*
*  For more information visit:
*
*  https://github.com/twilson63/nanofp/docs.md#map
*
*************************************************************
`
    )
  } finally {
    t.end()
  }
})
