import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import * as Plugin from "../src/index";
import { ValidationConfiguration } from '@aurelia/validation';

Aurelia
  .register(ValidationConfiguration.customize())
  .register(Plugin)
  .app(MyApp)
  .start();
