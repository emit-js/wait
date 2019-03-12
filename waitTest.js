/*global Promise*/
/* eslint-env jest */

var dot,
  wait = require("./")

beforeEach(function() {
  dot = require("dot-event")()
  wait(dot)
})

test("wait", function() {
  expect.assertions(1)

  return Promise.all([
    dot.wait("test", { count: 2 }),
    dot.wait("test"),
  ]).then(function() {
    expect(dot.state.wait.counters.test).toBe(2)
  })
})
