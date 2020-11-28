[![NPM Version](https://badge.fury.io/js/ts-dot-prop.svg)](https://badge.fury.io/js/ts-dot-prop)
[![CI](https://github.com/justinlettau/ts-dot-prop/workflows/CI/badge.svg)](https://github.com/justinlettau/ts-dot-prop/actions)
[![Dev Dependency Status](https://david-dm.org/justinlettau/ts-dot-prop/dev-status.svg)](https://david-dm.org/justinlettau/ts-dot-prop?type=dev)
[![codecov](https://codecov.io/gh/justinlettau/ts-dot-prop/branch/master/graph/badge.svg)](https://codecov.io/gh/justinlettau/ts-dot-prop)

# ts-dot-prop

TypeScript utility to transform nested objects using a dot notation path.

# Installation

```
npm install ts-dot-prop
```

# Usage

```js
import * as dot from 'ts-dot-prop';

const obj = {
  foo: 'bar',
  state: {
    name: 'New York',
  },
  fruit: [
    {
      type: 'Apple',
      color: 'red',
    },
    {
      type: 'Mango',
      color: 'orange',
    },
  ],
};

/**
 * Get
 */
dot.get(obj, 'state.name');
// => 'New York'

dot.get(obj, 'fruit[0].type');
// => 'Apple'

dot.get(obj, 'fruit[*].color');
// => ['red', 'orange']

dot.get(obj, 'state.capital');
// => undefined

dot.get(obj, 'state.population.total', 'not found');
// => 'not found'

/**
 * Set
 */
dot.set(obj, 'state.name', 'Paris');
// => state.name === 'Paris'

dot.set(obj, 'state.capital', 'Albany');
// => state.capital === 'Albany'

dot.set(obj, 'fruit[0].color', 'Green');
// => fruit[0].color === 'Green'

dot.set(obj, 'fruit[*].color', 'Yellow');
// => fruit[0].color === 'Yellow'
// => fruit[1].color === 'Yellow'

/**
 * Has
 */
dot.has(obj, 'state.name');
// => true

dot.has(obj, 'fruit[0].type');
// => true

/**
 * Remove
 */
dot.remove(obj, 'state.name');
// => state.name === undefined

dot.remove(obj, 'fruit[0].color');
// => fruit[0].color === undefined

/**
 * Paths
 */
dot.paths(obj);
// => ['foo', 'state.name', 'fruit']
```
