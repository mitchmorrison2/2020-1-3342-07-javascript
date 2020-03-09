/*
This assignment is broken into a number of sections. You'll want to get each
section completed before moving on to the next. To make this easier,
I've included all but the first section inside an

  if (false) {
    section
    section...
  }

As you complete a section, move the `if` part of this down past the end of the
next section, which will then make it live.

  section
  if (false) {
    section...
  }

Most sections have their own short description of the problem. However, there is
one global rule: you can only change the code in this file that lies between the
markers

  // START

and

  // END

So, in the following code:

  // START
  let a = 3
  let b
  // END
  assert.equal(a+b, 8)

You can change the let statements, but not the assert. (My intent here would be
for you to make the test pass my initializing b to 5.
*/

const assert = require('assert').strict   // ignore these two. they just
Error.stackTraceLimit = 2                 // set up the environment

///////////////// Section 1
//
// For some reason, some publishers seem to believe that by replacing
// vowels with asterisks in "offensive" words, they are sparing their
// readers' delicate sensibilities. The process is called bowlderization.
//
// Add a function to all strings so that
//
//    "offensive word".bowlderize()   // => '*ff*ns*v* w*rd'
//
// The original string is not changed: a new string is returned
//
// For this exercise, a vowel is a, e, i, or u.
//
// Graded: 10 for passing tests
// Penalties: 1 for poor layout
//            2 for using Object.assign


let str1 = "abc"
let str2 = "ABC"
let str3 = "beef"
let str4 = "briefly"
let str5 = "Offensive Word"

// START
String.prototype.bowlderize = function() {
  let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  let newStr = ''
  for (char of this) {
    if (vowels.indexOf(char) >= 0) {
      newStr += '*'
    }
    else {
      newStr += char
    }
  }
  return newStr
}
// END

assert.equal(str1.bowlderize(), "*bc")
assert.equal(str2.bowlderize(), "*BC")
assert.equal(str3.bowlderize(), "b**f")
assert.equal(str4.bowlderize(), "br**fly")
assert.equal(str5.bowlderize(), "*ff*ns*v* W*rd")


///////////////// Section 2
//
// Write a constructor function and any associated code
// to implement a Person class. The constructor takes a name
// and a title (Ms, Mr, ...) both of which are stored in the resulting
// object. The object will also have a `fullName()` function
// that returns the concatenation of the title and the name
//
// The tests show this in operation.
//
// It is OK to add the `fullName` function directly to the prototype.
//
// Grading: 20 for passing the tests
// Penalty:  -3 for layout
//           -3 for bad names
//

// START
Person = function(name, title) {
  this.name = name
  this.title = title
}
Person.prototype.fullName = function() {
  return (this.title + " " + this.name)
}


// END

p = new Person("Betty", "Ms")
assert.equal(p.name,  "Betty")
assert.equal(p.title, "Ms")
assert.equal(p.fullName(), "Ms Betty")


///////////////// Section 3
//
// Reimplement the code from section 2 using the ES2015
// `class` syntax. Call the class `Person1` so the name
// doesn't clash with that section.
//
// Grading: 15 for passing the tests
// Penalty:  -2 for layout
//           -2 for bad names
//

//START

class Person1 {
  constructor(name, title) {
    this.title = title,
    this.name = name
  }
  fullName() {
    return this.title + " " + this.name
  }
}

// END

p = new Person1("Fred", "Mr")
assert.equal(p.name,  "Fred")
assert.equal(p.title, "Mr")
assert.equal(p.fullName(), "Mr Fred")
assert(p.hasOwnProperty("name"))


///////////////// Section 4
//
// The built-in String class defines an instance method
// `sup()` that wraps the string in HTML <sup> tags.
//
// Write a function called `bugs` that takes a function as
// a parameter. This function should change the way
// `String.sup()` works: rather than "Doc".sup() returning
// "<sup>Doc</sup>", it should return "What's up, Doc?".
// It should then call the function that was passed in. When
// that function returns, it should reset String so that
// the original `sup()` function is restored.
//
// (ps. This is a bad idea in real code)
//
// Grading: 20 points to pass tests
// Penalty: -3 layout, -3 naming

//START

bugs = function (someFunc) {
  let supFn = String.prototype.sup
  String.prototype.sup = function() {
    return `What's up, ${this}?`
  }
  try {
    someFunc()
  }
  finally {
    String.prototype.sup = supFn
  }
}

//END

assert.equal("doc".sup(), "<sup>doc</sup>")
bugs(function() {
  assert.equal("Doc".sup(), "What's up, Doc?")
  assert.equal("Dave".sup(), "What's up, Dave?")
})
assert.equal("DOC".sup(), "<sup>DOC</sup>")


// this second test makes sure that you are correctly
// restoring the `sup()` function if the function passed
// to `bugs()` throws an exception. You might need to
// investigate JavaScript exception handling and the
// `finally` clause.


assert.throws(
  () => {
  bugs(function() {
    throw new Error("boom")
  })},
  {
    name: "Error",
    message: "boom"
  }
)

assert.equal("DOC".sup(), "<sup>DOC</sup>")


///////////////// Section 5
//
// We talked about what the `new` operator does.
//
// Write your own version `myNew` that takes a constructor
// function and any arguments, and that sets up the environment that allows that
// constructor function to run (setting `this`, and returning that `this` value
// to the caller.
//
// This only needs to work on constructor functions: you don;t need to consider
// the `class` syntax.
//
// Hint: it's 3 lines of code
//
// Grade: 15
// Penalty: -2 layout, -2 naming, -5 works but limited

function myNew(constructor, ...args) {
  //START
  var newObject = Object.create(constructor.prototype)
  constructor.apply(newObject, args)
  return newObject
  //END
}

function Box(w, h) {
  this.w = w
  this.h = h
}
Box.prototype.area = function() {
  return this.w*this.h
}

box = myNew(Box, 5, 7)
assert.equal(box.w, 5)
assert.equal(box.h, 7)
assert.equal(box.area(), 35)
