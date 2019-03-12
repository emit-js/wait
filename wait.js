/*global Promise*/
/*prettier-ignore*/
"use strict"

module.exports = function(dot) {
  if (dot.wait) {
    return
  }

  dot.state.wait = {
    counters: {},
    counts: {},
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

  if (arg && arg.count) {
    state.counts[propStr] = arg.count
  }

  state.counters[propStr]++

  if (state.counters[propStr] >= state.counts[propStr]) {
    state.resolvers[propStr]()
  }

  return state.promises[propStr]
}
