import { compose, map, filter, equals, all } from '../'
import test from 'tape'
import converter from 'number-to-words'
import jsv from 'jsverify'

test('compose', t => {
  t.plan(1)
  const isOdd = a => a % 2 === 1
  const data = [1, 2, 3, 4, 5, 6, 7]
  const result = compose(map(converter.toWords), filter(isOdd))(data)
  t.deepEquals(result, ['one', 'third', 'fifth', 'seventh'])
})

test('composes properties', t => {
  t.plan(1)
  t.ok(
    jsv.checkForall(jsv.fn(), jsv.fn(), jsv.nat(), function(f, g, x) {
      return equals(compose(f, g)(x), f(g(x)), true)
    })
  )
})

// test('associative', t => {
//   t.plan(1)
//   t.ok(
//     jsv.checkForall(jsv.fn(), jsv.fn(), jsv.fn(), jsv.nat, function(
//       f,
//       g,
//       h,
//       x
//     ) {
//       console.log(x)
//       var result = f(g(h(x)))
//       return all(equals(result), [
//         compose(f, g, h)(x),
//         compose(f, compose(g, h))(x),
//         compose(compose(f, g), h)(x)
//       ])
//     })
//   )
// })
