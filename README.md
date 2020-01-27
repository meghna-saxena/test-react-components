<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Intro to Test React Components with Jest and React Testing Library](#intro-to-test-react-components-with-jest-and-react-testing-library)
- [Render a React Component for testing using ReactDOM](#render-a-react-component-for-testing-using-reactdom)
- [Use Jest DOM for improved assertions](#use-jest-dom-for-improved-assertions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Intro to Test React Components with Jest and React Testing Library

Whether or not you're using React, all of the principles that we learn through
this module are going to be applicable regardless of how you get your DOM on the
screen.

With React specifically, we're using React testing library, but there are
testing libraries for a bunch of other frameworks.

Another thing is that we're using a unique `Jest configuration setup` here using
my `kcd-scripts` module. That's because we covered Jest configuration in another
module.

React testing library was created because of huge need in the React testing
ecosystem for a tool that did not encourage you to test implementation details,
which is a path to sadness. Instead, it encourages you to test your software in
the way that the software is going to be used, which is where you get your
confidence.

# Render a React Component for testing using ReactDOM

Using ReactDOM to render a simple React component to a `<div>` we create
ourselves and assert that it’s rendering the right thing based on the props we
provide.

# Use Jest DOM for improved assertions

- jest-dom: Custom jest matchers to test the state of the DOM.

The Jest DOM library provides really useful extensions to jest’s built-in
assertion library that makes it easier for to write our test assertions (like
toHaveTextContent).

If you're using just react-dom and make some typo on html element's name, the
error message you to get is `type error cannot read property type of null`.

Here the query selector for that input is going to return null, and you're
trying to access type on there.

It would be nice to get a nicer error message, and even nicer you get some more
descriptive assertions so that we can understand exactly what the intended
assertion is for the code.

There is a module out there in the `testing library family` of tools called
`jest-dom`. This allows a bunch of custom Jest matchers to
`test the state of the DOM`.

Use the below import to extend the expect method with custom jest matchers for
assertion:

```js
import '@testing-library/jest-dom/extend-expect'
```

That makes it a lot easier to read tests that are interacting with the DOM, as
well as get better error messages when you're making assertions on DOM nodes.
