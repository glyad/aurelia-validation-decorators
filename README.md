# Decorators for Aurelia Validation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
<!-- [![npm](https://img.shields.io/npm/v/@aurelia/validation.svg?maxAge=3600)](https://www.npmjs.com/package/@aurelia/validation) -->

The package provides decorators for Aurelia Validation, allowing you to easily apply validation rules to your model properties.

## Installation

To install the plugin, run the following command in your terminal:

Using `npm`:

``` bash
    npm install aurelia-validation-decorators
```

Using `yarn`:

``` bash
    yarn add aurelia-validation-decorators
```

Note:
This plugin requires Aurelia Validation to be installed in your project. If you haven't installed it yet, you can do so by running:

``` bash
    npm install @aurelia/validation
```

or

``` bash
    yarn add @aurelia/validation
```

## Usage

To use the decorators, you need to import them from the `aurelia-validation-decorators` package and apply them to your model properties. Here's an example of how to use the decorators:

```typescript
import { required, minLength, displayName } from 'aurelia-validation-decorators';

class Person {
  public readonly validationRules: IValidationRules = resolve(IValidationRules);
  @required({message: 'Name is required.' })
  @minLength(2, { tag: 'name' })
  @displayName('Full Name')
  public name: string = '';
  @between(0, 120)
  public age: number = 1;
  @email({ when: (value: Person) => value.age > 18 })
  public email: string;
}
```

In the View-Model class:

```typescript
import { IValidationController } from '@aurelia/validation';
export class MyApp {

  public person: Person = new Person();

  public constructor(
    // This may be moved to the constructor of the base class to avoid repetitive code in View-Models requiring validation
    readonly validationController: IValidationController = resolve(newInstanceForScope(IValidationController))) {
  }
}
```

In the View:

```html
<input type="text" value.bind="person.name & validate">
```

## Available Decorators

### Common Decorators

- `@displayName(name: string)`: Sets a custom display name for the property, which can be used in validation messages.

### Validation Decorators

| Decorator                                                                                    | Description                                                                            |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `@between(min: number, max: number, options?: ValidatorOptions)`                             | Validates that the property value is between the specified minimum and maximum values. |
| `@email(options?: ValidatorOptions)`                                                         | Validates that the property is a valid email address.                                  |
| `@equals(expectedValue: unknown, options?: ValidatorOptions)`                                | Validates that the property equals the expected value.                                 |
| `@matches(pattern: RegExp, options?: ValidatorOptions)`                                      | Validates that the property matches the specified regular expression.                  |
| `@max(value: number, options?: ValidatorOptions)`                                            | Validates that the property value is less than or equal to the specified maximum.      |
| `@maxItems(max: number, options?: ValidatorOptions)`                                         | Validates that the property has a maximum number of items (for arrays).                |
| `@maxLength(length: number, options?: ValidatorOptions)`                                     | Validates that the property has a maximum length.                                      |
| `@min(value: number, options?: ValidatorOptions)`                                            | Validates that the property value is greater than or equal to the specified minimum.   |
| `@minItems(min: number, options?: ValidatorOptions)`                                         | Validates that the property has a minimum number of items (for arrays).                |
| `@minLength(length: number, options?: ValidatorOptions)`                                     | Validates that the property has a minimum length.                                      |
| `@range(min: number, max: number, options?: ValidatorOptions)`                               | Validates that the property value is within the specified range.                       |
| `@required(options?: ValidatorOptions)`                                                      | Marks a property as required.                                                          |
| `@satisfies(predicate: (value: RuleCondition) => boolean, options?: ValidatorOptions)`       | Validates that the property satisfies a custom predicate function.                     |
| `@satisfiesRule(rule: IValidationRule<any, IValidateable<any>>, options?: ValidatorOptions)` | Validates that the property satisfies a custom validation rule.                        |
| `@satisfiesState(validState, stateFunction, messages, options?)`                             | Validates whether a property satisfies a specific state.                               |

## Acknowledgements, Licenses, and Copyright Notices

This project is intended to be used with [Aurelia 2](https://aurelia.io/) framework. This project is licensed under the MIT License. The Aurelia 2 framework is licensed under the separate [MIT license](https://github.com/aurelia/aurelia/blob/master/LICENSE).

Copyright © 2025 David Kossoglyad
