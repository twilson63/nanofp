const { map, prop, reduce, add } = require('../');

const stars = [
    { first: 'elvis', last: 'presley', alive: false },
    { first: 'jim', last: 'morrison', alive: false },
    { first: 'bob', last: 'dylan', alive: true },
    { first: 'buddy', last: 'holly', alive: false }
]
map(x => console.log("x", x), stars)

const firstName = map(x => prop('first', x), stars)
console.log("firstName", firstName)

const reduced = reduce((fnames, name) => {
    return fnames.concat(name.first)
}, [])
console.log("curried reduce", reduced(stars))


console.log(add(2, 3))