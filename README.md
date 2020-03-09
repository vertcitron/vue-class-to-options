# Vue Component Class API To Options API

As I needed it on a project with a lot of Class API components, I made this little utility that tries to converts
Vue Single File Components written in Class API to the same component in Options API.

This utility could be the base for a future thing able to cross-convert between Class, Options and Composition APIs.

This is for now a first attempt and is not deeply tested, so don't use it in production without checking with
attention every generated file. That's why the original files are actually not overwritten by the converted ones,
which are written aside originals, with an `.optionsAPI.vue` extension.

## Installation and usage

On the project where you need it *(here not recorded in package.json, check by yourself if you think you need it)*:

`npm install vue-class-to-options` then `npx vue-class-to-options path/to/file/toConvert.vue`

or with yarn :

`yarn add vue-class-to-options` then `yarn vue-class-to-options path/to/file/toConvert.vue`

## Output

At this early state, only these options are converted :

- All the file fragment before the `<script>`tag. It's commonly the template part of the component. This part is copied
without any modification. A guard avoid to cut it if any `<script>` tag is included in the `<template>`.

- The same for the fragment after `</script>`(commonly `<style>`), also copied without modification.

- The imports statements, placed at the beginning of the script tag. It's followed by any static out of component
stuff if there is (const declarations, out of component functions, etc.). The import part changes little bit from

- The component data interface, extracted from the original class component properties declarations, with their types.
It's placed between the import and static statements and the component export.

- The component name, extracted from the original class name.

- The child components to register, grabbed from the `@Component` decorator

- The props, grabbed from the `@Prop` decorators. If the prop is fully declared in the original source, all is well
declared in the destination, with the Vue type, the TS type via `Proptype<>` and default / required options. If the
Vue type is missing from source, the TS type is just added as a comment in the destination, and you'll have to declare
things as expected manually. My next step is to try to guess the proper Vue type from the TS type and the need for
required / default options, if I can.

- The component's data, extracted from properties declaration in the original, as properties of function return's,
implementing the interface discussed previously.

- Then the component's methods, quite copied as they are in the original source.

- All the others unprocessed stuff (e.g. all the lines unprocessed by the parsers) are copied in a block comment at the
end of the component marked "UNPROCESSED LINES", and have to be manually handled.

## Issues & contributions

As said, this is an early stage of this project, and you'll have to carefully check the converted components before
taking it to some production.

You're welcome to report any bug, suggestion or feature request at
https://github.com/vertcitron/vue-class-to-options/issues. I promise to handle the bugs, but the features requests will
depend on their content and the time left by my other stuffs.

You're also welcome to contribute if you feel it. In this case, after forking and dependances install (`npm install` or
`yarn`), you can launch via some quite standard commands :

- `npm run build` (or `yarn build`) to build the bundle (in `dist/index.js`).
- `npm run watch` (or `yarn watch`) to build in watch mode.
- `npm run start` (or `yarn start`) to build add launch after build : add at end of CLI the file path you want to
convert.
- `npm run dev` (or `yarn dev`) to start it via ts-node, without bundling. You also have to add a .vue file in the CLI.
- `npm run test` (or `yarn test`) to launch unit tests, all located in the `tests`directory.

This node package is coded in Typescript 3.8 and bundled with parcel-bundler.

When contributing, please submit your PRs under the master branch of the original repo, and before it make sure all
tests are passing.
