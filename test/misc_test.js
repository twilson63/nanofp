import {
  isNil,
  not,
  identity,
  always,
  equals,
  prop,
  path,
  concat,
  pluck,
  and,
  or,
  contains,
  noop
} from '../'
import test from 'tape'

test('contains', t => {
  t.plan(2)
  t.ok(contains('foo', 'foobar'))
  t.ok(contains('foo')('foobar'))
})

test('pluck', t => {
  t.plan(2)
  const stooges = [{ name: 'Larry' }, { name: 'Curley' }, { name: 'Moe' }]
  t.deepEquals(pluck('name', stooges), ['Larry', 'Curley', 'Moe'])
  t.deepEquals(pluck('name')(stooges), ['Larry', 'Curley', 'Moe'])
})

test('concat', t => {
  t.plan(1)
  const arr1 = [1, 2, 3]
  const arr2 = [4, 5, 6]
  const arr3 = [7, 8, 9]
  t.deepEquals(concat(arr1, arr2, arr3), [1, 2, 3, 4, 5, 6, 7, 8, 9])
})

test('path', t => {
  t.plan(2)
  const obj = { foo: { bar: { baz: 'Beep' } } }
  t.equals(path(['foo', 'bar', 'baz'], obj), 'Beep')
  t.equals(path(['foo', 'bar', 'baz'])(obj), 'Beep')
})

test('isNil', t => {
  t.plan(3)
  t.ok(isNil(undefined))
  t.ok(isNil(null))
  t.notOk(isNil(false))
})

test('not', t => {
  t.plan(2)
  t.ok(not(false))
  t.notOk(not(true))
})

test('identity', t => {
  t.plan(1)
  t.equals(identity(1), 1)
})

test('always', t => {
  t.plan(1)
  t.equals(always(2)(), 2)
})

test('equals', t => {
  t.plan(3)
  t.ok(equals(true, true))
  t.ok(equals(true)(true))
  t.notOk(equals(false)(true))
})

test('prop', t => {
  t.plan(2)
  t.equals(prop('foo', { foo: 'bar' }), 'bar')
  t.equals(prop('foo')({ foo: 'bar' }), 'bar')
})
