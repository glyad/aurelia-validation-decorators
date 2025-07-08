import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import { ValidationConfiguration } from '@aurelia/validation';

Aurelia
  .register(ValidationConfiguration.customize())
  .app(MyApp)
  .start();
