# todo-everything-solid

A to-do list frontend written in TypeScript using [SolidJS](https://solidjs.com).

Currently meant to run with the [todo-everything-django](https://github.com/todo-everything/todo-everything-django)
project, but should work well in general
with any backend that authenticates via JWT.

## Current goals (v1)

* [X] JWT login, logout (including token blacklisting), token refresh
* [X] Create, read, update, delete Todo items
    * [X] Create
    * [X] Read
    * [X] Update
    * [X] Delete
* [ ] Signup via email

## Built with

* SolidJS
* Bootstrap (previously daisyUI + Tailwind CSS)
* Testing with vitest + testing-library

## Usage

```bash
$ npm install # or pnpm install or yarn install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with
the [documentations](https://vitejs.dev/guide/static-deploy.html)
