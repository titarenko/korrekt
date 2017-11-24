# korrekt

Asynchronous validation library.

[![Build Status](https://travis-ci.org/titarenko/korrekt.svg?branch=master)](https://travis-ci.org/titarenko/korrekt)
[![Coverage Status](https://coveralls.io/repos/github/titarenko/korrekt/badge.svg?branch=master)](https://coveralls.io/github/titarenko/korrekt?branch=master)

## TOC

* [Installation](#installation)
* [Usage](#usage)
	* [Out of the box](#out-of-the-box)
	* [Custom rules](#custom-rules)
* [Reference](#reference)
	* [List of methods](#list-of-methods)
	* [List of rules](#list-of-rules)
* [License](#license)

## Installation

```bash
npm i korrekt --save
```

## Usage

### Out of the box

```js
const v = require('korrekt')

const validator = v.create({
	name: v.length({ min: 3 }),
	email: v.email(),
	skype: v.all([
		v.length({ min: 3 }),
		v.match(/\w+/),
	]),
	phone: v.when(it => !it.skype, v.all([
		v.match(/\d+/),
		v.length({ min: 9, max: 9 }),
	]))
})

validator({ name: 'me', email: 'me;myself@world.com', skype: 'abba' })
	.then(validatedObject => console.log(validatedObject))
	.catch(v.ValidationError, error => console.error(error.result))

// { name: { message: 'must be longer', meta: { min: 3 } }, email: { message: 'must be an email' } }
```

### Custom rules

```js
const v = require('korrekt')

v.register('same', function (field) {
	return function (value, _, instance) {
		if (instance[field] != value) {
			return `must be same as ${field}`
		}
	}
})

const validator = v.create({
	name: v.length({ min: 3, max: 10 }),
	password: v.length({ min: 3, max: 40 }),
	password_confirmation: v.same('password'),
})

validator({ name: 'me123456789', password: '1', password_confirmation: '2' })
	.then(validatedObject => console.log(validatedObject))
	.catch(v.ValidationError, error => console.error(error.fields))

// { name: { message: 'must be shorter', meta: { max: 10 } }, password: { message: 'must be longer', meta: { min: 3 } }, password_confirmation: { message: 'must be same as  password' } }
```

## Reference

### List of methods

#### create(rule)

Creates validator function.

#### register(name, rule, [overwrite])

Registers custom rule. Rule parameter here is actually the rule builder, accepting options and custom message as arguments. By default `register` throws exception if rule with same name already exists, but you can specify `true` as 3rd argument to explicitly overwrite existing rule.

### List of rules

Rule | Description
--- | ---
required() | Requires value to be present (not undefined or null).
length({ min, max }) | Verifies value has length and it is between specified boundaries (if any).
integer({ min, max }) | Verifies value is integer and it is between specified boundaries (if any).
number({ min, max }) | Verifies value is number (integer or real) and it is between specified boundaries (if any).
match(regex) | Verifies value matches regex.
enum(options) | Verifies value is equal to one of specified options.
email() | Verifies value is an email (has @ inside).
when(predicate: instance => boolean, rule) | Verifies value is valid according to rule, but verification is done only if predicate returns true.
all(rules) | Verifies value is valid according to each rule from rules array.
any(rules) | Verifies value is valid according to at least one rule from rules array.
array(rule, { min, max }) | Verifies value is an array and each item of it is valid according to rule. Also checks array length if at least one boundary is specified.
object({ name: rule }) | Verifies value is an object and checks whether its fields are valid according to rules.

## License

MIT
