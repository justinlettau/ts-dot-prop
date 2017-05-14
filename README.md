[![NPM Version](https://badge.fury.io/js/ts-dot-prop.svg)](https://badge.fury.io/js/ts-dot-prop)
[![Build Status](https://travis-ci.org/justinlettau/ts-dot-prop.svg?branch=master)](https://travis-ci.org/justinlettau/ts-dot-prop)
[![Dev Dependency Status](https://david-dm.org/justinlettau/ts-dot-prop/dev-status.svg)](https://david-dm.org/justinlettau/ts-dot-prop?type=dev)

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
    foo: {
        bar: 'unicorn'
    }
};

/**
 * Get
 */
dot.get(obj, 'foo.bar');
// => 'unicorn'

dot.get(obj, 'foo.nothing.deep');
// => undefined

dot.get(obj, 'foo.nothing.deep', 'default value');
// => 'default value'

/**
 * Set
 */
dot.set(obj, 'foo.bar', 'b');
// => { foo: { bar: 'b'} }

dot.set(obj, 'foo.baz', 'x');
// => { foo: { bar: 'b', baz: 'x'} }

/**
 * Has
 */
dot.has(obj, 'foo.bar');
// => true

/**
 * Delete
 */
dot.delete(obj, 'foo.bar');
// => { foo: {} }

```
