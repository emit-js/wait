/*global Promise*/
/*prettier-ignore*/
"use strict"

module.exports = function(dot) {
  if (dot.wait) {
    return
  }

  dot.state.wait = {
    counters: {},
    promises: {},
    resolvers: {},
  }

  dot.any("wait", wait)
}

function wait(prop, arg, dot) {
  var propStr = prop.join("."),
    state = dot.state.wait

  if (state.counters[propStr] === undefined) {
    var resolve

    var promise = new Promise(function(r) {
      resolve = r
    })

    state.counters[propStr] = 0
    state.promises[propStr] = promise
    state.resolvers[propStr] = resolve
  }

  state.counters[propStr]++

  if (state.counters[propStr] >= arg.count) {
    state.resolvers[propStr]()
  }

  return state.promises[propStr]
}
