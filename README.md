# korrekt

Asynchronous validation library

[![Build Status](https://travis-ci.org/titarenko/korrekt.svg?branch=master)](https://travis-ci.org/titarenko/korrekt)
[![Coverage Status](https://coveralls.io/repos/github/titarenko/korrekt/badge.svg?branch=master)](https://coveralls.io/github/titarenko/korrekt?branch=master)

## Installation

```bash
npm i korrekt --save
```

## Usage

### Basic

```js
const v = require('korrekt')

const validator = v.create({
	name: v.length({ min: 3 }),
	email: v.match(/[\w\d\.]+@[\w\d\.]+/, 'email is not valid'),
	skype: [v.length({ min: 3 }), v.match(/[\w\d]+/)],
	phone: v.when(it => !it.skype, [v.match(/\d+/), v.length({ min: 9, max: 9 })])
})

validator({ name: 'me', email: 'me;myself@world.com', skype: 'abba' })
	.then(validatedObject => console.log(validatedObject))
	.catch(v.ValidationError, error => console.error(error.fields))

// { name: '"name" length must be at least 3', email: 'email is not valid' }
```

### Advanced (localization, custom rules)

```js
const v = require('korrekt')

v.customize('length', (params, options) => `длина поля ${params.name} должна быть от ${options.min} до ${options.max}`)

v.register('same', function (options, message) {
	return function (params) {
		if (params.value != params.subject[options.field]) {
			return v.get({ rule: 'same', params, options, message })
		}
	}
})

const validator = v.create({
	name: v.length({ min: 3, max: 10 }),
	password: v.length({ min: 3, max: 40 }),
	password_confirmation: v.same({ field: 'password' }, 'confirmation must match password')
})

validator({ name: 'me123456789', password: '1', password_confirmation: '2' })
	.then(validatedObject => console.log(validatedObject))
	.catch(v.ValidationError, error => console.error(error.fields))

// { name: 'длина поля name должна быть от 3 до 10', password: 'длина поля password должна быть от 3 до 40', password_confirmation: 'confirmation must match password' }
```

## Reference

**Validator** is a function accepting object as one argument and returning promise either fulfilled with accepted object, or rejected with object representing validation errors.

Validator is being buit in a declarative way using schema and `korrekt.create` method.

**Schema** is an object representing set of validation rules. Each key is field name, each value is either rule or array of rules.

### List of rules

#### required(message)

Requires object to have field (but does not require it to be not null). Message optional argument is a custom validation error message.

#### length({ min, max }, message)

Checks length. Min, max and message are optional. If no min and max values are specified, then checks that value is not falsey (for example, "" is falsey value). If min or max are omitted, then lower or upper bound (respectively) is not checked. Message optional argument is a custom validation error message.

#### integer({ min, max }, message)

Checks that value is integer. If max and/or min is specified, then it also checks that value falls within specified boundaries. You can specify both or just one boundary (min or max) to check for. Message optional argument is a custom validation error message.

#### number({ min, max }, message)

Same as `integer`, but allows real (float) values. Message optional argument is a custom validation error message.

#### match(regex, message)

Checks that value matches specified regex. Message optional argument is a custom validation error message.

#### enum(array, message)

Checks that value belongs to specified array of values (enumeration). Message optional argument is a custom validation error message.

#### when(predicate, rule)

Checks that value satisfies requiremets expressed via rule, but check is done only if predicate (called with object under validation as argument) returns true.


## License

MIT
