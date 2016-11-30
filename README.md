Reactor
================

Reactor is a base Node web service for building web applications with rich front-ends. The project is setup with the necessary base packages, asset build pipeline, and sample web page that makes an AJAX request.

The client is built with [Webpack](https://webpack.github.io/) and setup in a [Flux](https://facebook.github.io/flux/) architecture using [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), and [React-Router](https://github.com/reactjs/react-router).

## Installation
Ensure you have the current LTS version of Node and NPM installed (4.4.x and 3.x respectively). If not, Node is available [here](https://nodejs.org/en/download/), though it is recommended you use something like [NVM](https://github.com/creationix/nvm) instead to manage Node versions. To update NPM, simply run `npm install -g npm` (Note: you may need to run as `sudo`).

Clone or fork the repo and run the `npm install` command to fetch the repo's dependencies.

## Build / Packaging
All of the build tasks are setup and managed via `npm` commands, which wrap Webpack and other CLIs for compiling assets.

The primary build task is `npm run build` which will clean the `/public` directory completely (where all static assets are served from), compile all of the CSS from the `/client` directory, compile all of the components from the `/client` directory, and copy over images stored in the `/client` directory.

If you are actively developing components, a `watch` commands `npm run build:watch`, which watch for changes to the styles and client-side components, building a new bundle.

There are both `dev` and `production` bundles that are built, and these can be built independently via the `npm run build:dev` and `npm run build:dist` commands respectively. The former will simply build a concated JavaScript and CSS file whereas the latter will also minify/uglify and set other "production" flags (e.g., removing dead code paths, deduping dependencies, etc.).

## Running the server
To run the server, simply run the `npm start` command. The server starts on port `8080` by default, however this can be overridden by specifying an environment variable (e.g., `PORT=9090 npm start`) or changing the default value in the `www` file.

## Running the tests
To run the tests, simply run the `npm test` command. The `npm test` command will run tests for both the client- and server-side components, though note that the tests do run independently.
