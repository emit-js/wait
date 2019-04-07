/*global Promise*/
/*prettier-ignore*/
"use strict"

module.exports = function(emit) {
  if (emit.wait) {
    return
  }

  emit.state.wait = {
    counters: {},
    counts: {},
    promises: {},
    resolvers: {},
  }

  emit.any("wait", wait)
}

function wait(arg, prop, emit) {
  var propStr = prop.join("."),
    state = emit.state.wait

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
