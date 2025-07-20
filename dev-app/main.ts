import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import { ValidationHtmlConfiguration, ValidationTrigger } from '@aurelia/validation-html';

Aurelia
  .register(ValidationHtmlConfiguration.customize((options) => {
    // customization callback
    options.DefaultTrigger = ValidationTrigger.change;
  }))
  .app(MyApp)
  .start();
