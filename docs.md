# Nano FP Help Docs

## curry

curry is a function that takes a function as an input and will return a
function that can take partial inputs overtime or all the inputs and invoke
the passed in function when all arguments are supplied, otherwise, it will
continue to pass functions asking for the remaining arguments. It works great for functions with up to four inputs.

### usage

``` js
const add = curry(function (a,b) {
  return a + b
})
const add5 = add(5)
const total = add5(3) // 8
add(5,6) // 11
```
