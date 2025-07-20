import { newInstanceForScope, resolve } from "aurelia";
import { displayName, minLength, required, maxLength, email } from "../src";
import { IValidationController } from "@aurelia/validation-html";

interface Address {
  line1: string;
  line2?: string;
  city: string;
  pin: number;
}

export class Person {
  @required()
  @minLength(2, {when: (value: Person) => { 
    return value.age > 0; } })
  @maxLength(4)  
  @displayName('Full Name')
  public name: string = '';
  @required()
  public age: number = 1;
  @email()
  public email: string;
  public pets: string[];
  public address: Address;
  
}

export class Contact {
    
  @required()
  @maxLength(3)
  @displayName('Full Name')
  public name: string = '';
  
  private _email: string;
  @email()
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  @required()
  public phone: string;
}

export class MyApp {

  public person: Person = new Person();
  public contact: Contact = new Contact();

  constructor(readonly validationController: IValidationController = resolve(newInstanceForScope(IValidationController))) {
  }
  
}
