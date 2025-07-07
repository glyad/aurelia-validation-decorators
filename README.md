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

## Build the plugin in production modern

    npm run build

It builds plugin into `dist/index.js` file.

Note when you do `npm publish` or `npm pack` to prepare the plugin package, it automatically run the above build command by the `prepare` script defined in your package.json `"scripts"` section.

## Consume the plugin

If your plugin is published to npm or a private registry, just install the plugin package.json

    npm install aurelia-validation-decorators

If you want to directly use plugin's git repo.

    npm install git@github.com:username/aurelia-validation-decorators.git

or

    npm install https://some.git.server/username/aurelia-validation-decorators.git

If you want to install from local folder, don't do "npm install ../local/aurelia-validation-decorators/" as the folder's `node_modules/` will cause webpack to complain about duplicated dependency like "@aurelia/metadata".

In this plugin's folder, do

    npm pack

This will pack the plugin into aurelia-validation-decorators
In an application project's main file.

```js
import * as myPlugin from 'aurelia-validation-decorators';
Aurelia
  // Load all exports from the plugin
  .register(myPlugin)
  .app(MyApp)
  .start();
```

## Unit Tests

    npm run test

Run unit tests in watch mode.

    npm run test:watch

## Analyze webpack bundle

    npm run analyze
