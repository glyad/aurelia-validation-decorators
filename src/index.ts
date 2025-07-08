/* eslint-disable @typescript-eslint/no-explicit-any */
import { IValidateable, IValidationRule, IValidationRules, PropertyRule, RuleCondition, ValidationRuleExecutionPredicate } from "@aurelia/validation";

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

// Helper function to create validation rule decorators
function createValidationDecorator(
  validationFn: (rule: any, ...args: any[]) => any,
  args: any[] = [],
  options?: ValidatorOptions
) {
  return (_, context: ClassMemberDecoratorContext) => {
    const { name } = context;
        
    context.addInitializer(function (this: any) {
      if (!this.validationRules) {
        throw new Error("validationRules property is missing on the class instance. Please ensure the class has a 'validationRules' property of type IValidationRules.");
      }
      
      let thisRule = (this.validationRules as IValidationRules)
        .on(this)
        .ensure(name);
      
      // Apply the specific validation function
      thisRule = validationFn(thisRule, ...args);
      
      // Apply common options
      if (options?.message) {
        thisRule.withMessage(options.message);
      } else if (options?.messageKey) {
        thisRule.withMessageKey(options.messageKey);
      }
      if (options?.tag) {
        thisRule.tag(options.tag);
      }
      if (options?.when && typeof options.when === 'function') {
        thisRule.when(options.when);
      }
    });
  };
}

/**
 * Creates a decorator that sets a custom display name for a property in validation error messages.
 * 
 * @param displayName - The human-readable name to use for the property in validation messages
 * @returns A property decorator that configures the display name for validation
 * 
 * @example
 * ```ts
 * class User {
 *   @displayName('E-mail Address')
 *   @required()
 *   email: string;
 * }
 * ```
 */
export function displayName(displayName: string) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, string>, name: string) => rule.displayName(name),
    [displayName]
  );
}

/**
 * Creates a validation decorator that ensures a number property's value is between specified minimum and maximum values (inclusive).
 *
 * @param min - The minimum value (inclusive) that the property can have
 * @param max - The maximum value (inclusive) that the property can have
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies the 'between' validation rule
 *
 * @example
 * class Person {
 *   @between(18, 65)
 *   age: number;
 * }
 */
export function between(min: number, max: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, number>, min: number, max: number) => rule.between(min, max),
    [min, max],
    options
  );
}

/**
 * Creates a decorator that applies email validation to a property.
 * 
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies email validation rules when used
 * 
 * @example
 * ```typescript
 * class Contact {
 *   @email()
 *   emailAddress: string;
 * }
 * ```
 */
export function email(options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, string>) => rule.email(),
    [],
    options
  );
}

/**
 * Creates a validation decorator that checks if a property equals the expected value.
 * 
 * @param expectedValue - The value that the property should equal
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies an equals validation rule
 */
export function equals(expectedValue: unknown, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, unknown>, expected: unknown) => rule.equals(expected),
    [expectedValue],
    options
  );
}

/**
 * Creates a validation decorator that ensures a string property matches the provided regular expression pattern.
 * 
 * @param pattern - The regular expression pattern to match against
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies the pattern matching validation rule
 */
export function matches(pattern: RegExp, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, string>, pattern: RegExp) => rule.matches(pattern),
    [pattern],
    options
  );
}

/**
 * Creates a decorator that validates a numeric property is less than or equal to a specified constraint value.
 * 
 * @param constraint - The maximum value allowed for the decorated property
 * @param options - Optional configuration options for the validation rule
 * @returns A property decorator that applies a maximum value validation rule
 * 
 * @example
 * ```typescript
 * class Product {
 *   @max(100)
 *   price: number = 0;
 * }
 * ```
 */
export function max(constraint: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, number>, constraint: number) => rule.max(constraint),
    [constraint],
    options
  );
}

/**
 * Creates a validation decorator that ensures an array property does not exceed a specified maximum number of items.
 *
 * @param length - The maximum number of items allowed in the array
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies the maxItems validation rule
 */
export function maxItems(length: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, unknown[]>, count: number) => rule.maxItems(count),
    [length],
    options
  );
}

/**
 * Decorator that creates a validation rule to ensure a string's length does not exceed the specified maximum.
 * 
 * @param length - The maximum allowed length for the string
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies the maxLength validation rule
 * 
 * @example
 * ```typescript
 * class User {
 *   @maxLength(10)
 *   username: string;
 * }
 * ```
 */
export function maxLength(length: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, number>, len: number) => rule.maxLength(len),
    [length],
    options
  );
}

/**
 * Creates a validation decorator that validates a numeric property is greater than or equal to a specified constraint value.
 * 
 * @param constraint - The minimum value that the property must be greater than or equal to
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies the minimum value validation rule
 * 
 * @example
 * ```typescript
 * class Product {
 *   @min(0)
 *   quantity: number;
 * }
 * ```
 */
export function min(constraint: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, number>, constraint: number) => rule.min(constraint),
    [constraint],
    options
  );
}

/**
 * Decorator that creates a validation rule ensuring an array property contains at least the specified number of items.
 * 
 * @param length - The minimum number of items the array must contain
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies the minimum items validation rule
 * 
 * @example
 * ```typescript
 * class MyClass {
 *   @minItems(3)
 *   public myArray: string[] = [];
 * }
 * ```
 */
export function minItems(length: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, unknown[]>, count: number) => rule.minItems(count),
    [length],
    options
  );
}

/**
 * Creates a validation decorator that enforces a minimum length for a property.
 * 
 * @param length - The minimum length required for the property
 * @param options - Optional validation configuration options
 * @returns A property decorator that applies the minimum length validation rule
 * 
 * @example
 * ```typescript
 * class User {
 *   @minLength(8)
 *   password: string;
 * }
 * ```
 */
export function minLength(length: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, number>, len: number) => rule.minLength(len),
    [length],
    options
  );
}

/**
 * Creates a property decorator that validates if a number value is within the specified range.
 * 
 * @param min - The minimum value (inclusive) that the property value can be
 * @param max - The maximum value (inclusive) that the property value can be
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies range validation rules
 * 
 * @example
 * ```typescript
 * class Product {
 *   @range(0, 100)
 *   quantity: number;
 * }
 * ```
 */
export function range(min: number, max: number, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, number>, min: number, max: number) => rule.range(min, max),
    [min, max],
    options
  );
}

/**
 * Creates a decorator that marks a property as required during validation.
 * 
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies a required validation rule
 * 
 * @example
 * ```typescript
 * class User {
 *   @required()
 *   name: string;
 * }
 * ```
 */
export function required(options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, unknown>) => rule.required(),
    [],
    options
  );
}

/**
 * Creates a property decorator that applies a validation rule checking if the property
 * satisfies the given condition.
 * 
 * @param condition - The condition that the property value must satisfy to be considered valid
 * @param options - Optional validator configuration options
 * @returns A property decorator that applies the validation rule
 * 
 * @example
 * ```ts
 * class User {
 *   @satisfies(value => value.length > 0, { message: 'Name cannot be empty' })
 *   name: string;
 * }
 * ```
 */
export function satisfies(condition: RuleCondition, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, unknown[]>, condition: RuleCondition) => rule.satisfies(condition),
    [condition],
    options
  );
}

/**
 * Applies a custom rule instance.
 * 
 * @param validationRule — rule instance.
 * @param options - rule options for the validation decorator.
 * @returns 
 */
export function satisfiesRule(validationRule: IValidationRule<any, IValidateable<any>>, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, unknown>, validationRule: IValidationRule<any, IValidateable<any>>) => rule.satisfiesRule(validationRule),
    [validationRule],
    options
  );
}

/**
 * Creates a validation decorator that validates whether a property satisfies a specific state.
 * 
 * @param validState - The property key representing the valid state that the value should satisfy.
 * @param stateFunction - A function that evaluates the state of the value and returns a state key or a promise resolving to a state key.
 *                        The state key will be compared with the validState to determine if validation passes.
 * @param messages - A mapping of state keys to error messages. The message corresponding to the returned state key will be used when validation fails.
 * @param options - Optional configuration options for the validator.
 * @returns A property decorator that applies the state validation to the decorated property.
 * 
 * @example
 * class User {
 *   @satisfiesState('VALID', 
 *     (value) => value.length > 3 ? 'VALID' : 'INVALID', 
 *     { 'INVALID': 'Username must be longer than 3 characters' })
 *   username: string;
 * }
 */
export function satisfiesState(validState: PropertyKey, stateFunction: (value: unknown, object?: IValidateable) => PropertyKey | Promise<PropertyKey>, messages: Partial<Record<PropertyKey, string>>, options?: ValidatorOptions) {
  return createValidationDecorator(
    (rule: PropertyRule<IValidateable, unknown>, 
      validState: PropertyKey, 
      stateFunction: (value: unknown, object?: IValidateable) =>
        PropertyKey | Promise<PropertyKey>, messages: Partial<Record<PropertyKey, string>>) =>
           rule.satisfiesState(validState, stateFunction, messages),
    [validState, stateFunction, messages],
    options
  );
}
