# Decorators for Aurelia Validation

[![NPM Version](https://img.shields.io/npm/v/aurelia-validation-decorators)](https://www.npmjs.com/package/aurelia-validation-decorators)
[![NPM Downloads](https://img.shields.io/npm/dy/aurelia-validation-decorators)](https://www.npmjs.com/package/aurelia-validation-decorators)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

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
    npm install @aurelia/validation @aurelia/validation-html
```

or

``` bash
    yarn add @aurelia/validation @aurelia/validation-html
```

> Make sure to have the Aurelia Validation plugin configured in your Aurelia application.

## Usage

> There is no need to register the decorators plugin in the Aurelia application configuration.

To use the decorators, you need to import them from the `aurelia-validation-decorators` package and apply them to your model properties. Here's an example of how to use the decorators:

```typescript
import { required, between, email, maxLength, minLength, displayName } from 'aurelia-validation-decorators';

export class Person {

  @required({message: 'Name is required.' })
  @minLength(2, { tag: 'name' })
  @maxLength(5)
  @displayName('Full Name')
  public name: string = '';

  @between(0, 120)
  public age: number = 1;

  private _email: string;
  @email({ when: (value: Person) => value.age > 18 })
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

}
```

In the View-Model class:

```typescript
import { IValidationController } from '@aurelia/validation';
export class MyApp {

  public person: Person = new Person();

  public constructor(
    // This may be moved to the constructor of the base class to avoid repetitive code in View-Models classes
    protected readonly validationController: IValidationController = resolve(newInstanceForScope(IValidationController))) {
  }
}
```

In the View:

```html
<input type="text" value.bind="person.name & validate" validation-errors.from-view="errors">
<span repeat.for="error of errors">${error.result.message}</span>
```

## Decorator Options

The decorators accept an optional `ValidatorOptions` object that allows you to customize the validation behavior.

```typescript
/**
 * Options that can be passed to validation decorators.
 *
 * @typedef {Object} ValidatorOptions
 * @property {string} [message] - Custom error message to display when validation fails.
 * @property {string} [messageKey] - Key to lookup a message in a resource file.
 * @property {string} [tag] - Tag for the validation rule, useful for filtering or categorizing validations.
 * @property {ValidationRuleExecutionPredicate<any>} [when] - Predicate that determines when the validation rule should be executed.
 */
export type ValidatorOptions = { message?: string, messageKey?: string, tag?: string, when?: ValidationRuleExecutionPredicate<any> };

```

## Available Decorators

### Common Decorators

- `@displayName(name: string)`: Sets a custom display name for the property, which can be used in validation messages.

### Validation Decorators

| Decorator                                                                                                             | Description                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `@between(min: number, max: number, options?: ValidatorOptions)`                                                      | Validates that the property value is between the specified minimum and maximum values. |
| `@email(options?: ValidatorOptions)`                                                                                  | Validates that the property is a valid email address.                                  |
| `@equals(expectedValue: unknown, options?: ValidatorOptions)`                                                         | Validates that the property equals the expected value.                                 |
| `@matches(pattern: RegExp, options?: ValidatorOptions)`                                                               | Validates that the property matches the specified regular expression.                  |
| `@max(value: number, options?: ValidatorOptions)`                                                                     | Validates that the property value is less than or equal to the specified maximum.      |
| `@maxItems(max: number, options?: ValidatorOptions)`                                                                  | Validates that the property has a maximum number of items (for arrays).                |
| `@maxLength(length: number, options?: ValidatorOptions)`                                                              | Validates that the string's length does not exceed the specified maximum.              |
| `@min(value: number, options?: ValidatorOptions)`                                                                     | Validates that the property value is greater than or equal to the specified minimum.   |
| `@minItems(min: number, options?: ValidatorOptions)`                                                                  | Validates that the property has a minimum number of items (for arrays).                |
| `@minLength(length: number, options?: ValidatorOptions)`                                                              | Validates that that enforces a minimum string's length for a property.                 |
| `@range(min: number, max: number, options?: ValidatorOptions)`                                                        | Validates that the property value is within the specified range.                       |
| `@required(options?: ValidatorOptions)`                                                                               | Marks a property as required.                                                          |
| `@satisfies(predicate: (value: TValue, object?: TObject) => boolean \| Promise<boolean>, options?: ValidatorOptions)` | Validates that the property satisfies a custom predicate function.                     |
| `@satisfiesRule(rule: IValidationRule<any, IValidateable<any>>, options?: ValidatorOptions)`                          | Validates that the property satisfies a custom validation rule.                        |
| `@satisfiesState(validState, stateFunction, messages, options?)`                                                      | Validates whether a property satisfies a specific state.                               |

### Custom Validators

You can also create custom validation decorators by using the `@matches` decorator with a custom regular expression, e.g.,

```typescript
@matches(/^[A-Z][a-z]+$/, { message: 'Must start with a capital letter and contain only letters.' })
```

or

```typescript
@matches(/^[-+±]?\d+(\.\d+)?$/, { message: 'Must be a valid number. Allowed formats: 123, ±2, -123.45, +0.5' })
```

## Acknowledgements, Licenses, and Copyright Notices

This project is intended to be used with [Aurelia 2](https://aurelia.io/) framework. This project is licensed under the MIT License. The Aurelia 2 framework is licensed under the separate [MIT license](https://github.com/aurelia/aurelia/blob/master/LICENSE).

Copyright © 2025 David Kossoglyad
