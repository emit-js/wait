# @emit-js/wait

[emit](https://github.com/emit-js/emit#readme) async wait

![wait](wait.gif)

## Install

```bash
npm install @emit-js/emit @emit-js/wait
```

## Setup

```js
const emit = require("@emit-js/emit")()
require("@emit-js/wait")(emit)
```

## Usage

Wait for two async processes to call `emit.wait`:

```js
async function test() {
  await emit.wait({ count: 2 })
}

await test() // never finishes

await Promise.all([test(), test()]) // finishes
```

## Why?

Sometimes you want to call the same function multiple times asynchronously, and you want each call to wait for certain "checkpoints" across all calls.

As long as you know how many total calls there are (`count`), you can wait for each call to reach `emit.wait` before continuing.

Each `emit.wait` must receive a unique prop to begin a new counter.
