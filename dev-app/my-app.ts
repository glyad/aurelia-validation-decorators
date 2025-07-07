import { IValidationRules } from "@aurelia/validation";
import { resolve } from "aurelia";
import { displayName, minLength, required, maxLength } from "../src";

interface Address {
  line1: string;
  line2?: string;
  city: string;
  pin: number;
}

export class Person {
  public readonly validationRules: IValidationRules = resolve(IValidationRules);
  @required()
  @minLength(2, {when: (value: Person) => { 
    return value.age > 0; } })
  @maxLength(4)  
  @displayName('Full Name')
  public name: string = '';
  public age: number = 1;
  public email: string;
  public pets: string[];
  public address: Address;
  
}

export class MyApp {
}
