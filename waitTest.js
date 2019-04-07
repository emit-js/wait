/*global Promise*/
/* eslint-env jest */

var emit,
  wait = require("./")

beforeEach(function() {
  emit = require("@emit-js/emit")()
  wait(emit)
})

test("wait", function() {
  expect.assertions(1)

  return Promise.all([
    emit.wait("test", { count: 2 }),
    emit.wait("test", { count: 2 }),
  ]).then(function() {
    expect(emit.state.wait.counters.test).toBe(2)
  })
})
