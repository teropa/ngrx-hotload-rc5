## Minimum viable hot loading project with Angular rc.5 and @ngrx/store

This project contains a functional hot loading setup on top of @ngrx/store and Angular 2 rc.5.

It's an experiment more than anything at the moment. I'm trying to figure out how to do this after
the module and bootstrap changes in rc.5

1. `npm install` and `npm run start`
2. Increment / decrement the counter
3. Make a code change
4. Observe the app reload while **the state persists**.

### How it works

The setup is modeled after [ngrx-store-hmr](https://github.com/CodeSequence/ngrx-store-hmr), but
uses the new `NgModule` driven bootstrap.

Most of the work is done in `hot-store.ts`, which is a file that should be extracted to a library instead
of being mixed with application code. It handles Webpack hot reloads, holds on to the Store state between
them, and exposes a function that allows reading the app state.

The application developer needs to do two things:

1. If the module is hot, let the hot store bootstrap the app. This is shown in `main.ts`. It's the same pattern as is used in `ngrx-store-hmr`.
2. Construct the @ngrx/store module with a special factory function that may take the current hot reload state as the initial state. This is shown in `app.module.ts`.

This second step is new, and I'm not really happy with it from an API design point of view. Previously the app developer only needed to let `ngrx-store-hmr` do the bootstrap, but now they also need to construct this special
`NgModule` for `@ngrx/store`. This is because the provider based bootstrap that allowed you to just slip the old state into a function is now deprecated.
