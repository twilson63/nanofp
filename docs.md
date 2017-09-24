# Nano FP Help Docs

## Contents

* [curry](#curry)
* [map](#map)
* [filter](#filter)
* [reduce](#reduce)

## curry

### What does it do?

`curry` allows you to supply a functions arguments over time and not all at once.

### How do I use it?

`curry` is a function that takes a function as an input and will return a
function that can take partial inputs overtime or all the inputs and invoke
the passed in function when all arguments are supplied, otherwise, it will
continue to pass functions asking for the remaining arguments. It works great for functions with up to four inputs.

### usage

``` js
const add = curry(function(a, b) {
  return a + b
})
const add5 = add(5)
const total = add5(3) // 8
add(5,6) // 11
```

---

## map

### What does it do?

`map` allows you to take a list of values and transform the values using the supplied unairy function (a function that takes one input and returns a result) applied on all values in the array, with the result of creating a new way of the transformed values.

### How do I use it?

`map` is a function that takes two inputs the first input is an unairy function and the second input is a array. It can be curried or partially applied and when invoked it will return a new array with transformed values from the the result of the supplied unairy function.

### usage

``` js
const doubl = function (v) { return v * 2 }
const results = map(doubl, [1,2,3,4]) // 2, 4, 6, 8
```

---

## filter

### What does it do?

`filter` takes a predicate function (a function that returns true or false) and an array, the filter function will return a new array that only keeps the values that result in a true return value when the predicate function is invoked for each value.

### How do I use it?

`filter` is a function that takes two inputs, the first input is a predicate function, and the second input is an array of values. It returns a new list with all the values that result in true from the predicate function.

### Usage

``` js
const isOdd = function (n) {
  return n % 2 === 1
}
filter(isOdd, [1,2,3,4,5]) // [1,3,5]
```

---
