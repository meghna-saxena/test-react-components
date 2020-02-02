<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Intro to Test React Components with Jest and React Testing Library](#intro-to-test-react-components-with-jest-and-react-testing-library)
- [Render a React Component for testing using ReactDOM](#render-a-react-component-for-testing-using-reactdom)
- [Use Jest DOM for improved assertions](#use-jest-dom-for-improved-assertions)
- [Use DOM Testing Library to Write More Maintainable React Tests](#use-dom-testing-library-to-write-more-maintainable-react-tests)
- [Use React Testing Library to Render and Test React Components](#use-react-testing-library-to-render-and-test-react-components)

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

# Use DOM Testing Library to Write More Maintainable React Tests

Note: Ignore casing by regex `/regex/i`

Our tests are currently tightly coupled to the implementation of our component’s
element structure. A refactor to that structure wont break our application, but
will definitely break our tests because we’re testing implementation details.
Let’s use DOM Testing Library to create a custom render function that will give
us some helpful utilities for searching for elements in the DOM in the same way
a user would.

If I go into `favorite-number.js` and
`break the association between this label and the input by making a typo in the htmlFor`
for example and save this, my `test is still passing` but my
`application is actually broken for people using screen readers` and other
assistive technologies.

Make an assertion to make sure that the label and the input are associated
together properly. It can be done by checking that label htmlFor attribute and
input id attribute are same.

There are various ways to associate a label and an input together and I don't
want to have to worry about all of those different mechanisms for associating
those together. It'd be even better if I had some sort of abstraction that let
me get the input by the label. That's exactly what DOM testing library does for
us.

```js
import {queries} from '@testing-library/dom'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const input = queries.getByLabelText(div, 'Favorite Number')
  expect(input).toHaveAttribute('type', 'number')
})
```

> Get an error message. It says it Found a label with the text favorite number,
> however, no form control was found associated to that label. Make sure you're
> using the "for" attribute or the "aria-labelledby" attribute correctly.

We see the typo I and can correct the spelling.

Make the label text case-insensitive What I'm going to do is instead of using a
string I'm going to use a regex. We'll pass the `i` Flag which will ignore case.
That makes my query a lot more resilient to changes in my code.

`const input = queries.getByLabelText(div, /favorite number/i)`

Another improvement, instead of importing `queries`, import
`getQueriesForElement`, so that you can avoid passing `div` everywhere

```js
import {queries, getQueriesForElement} from '@testing-library/dom'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)

  const {getByLabelText} = getQueriesForElement(div)

  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

From `getQueriesForElement` we have a bunch of other queries that we can access
from DOM testing library for finding elements in the render DOM.

We have an implicit assertion here that says, "We do have a label with the text
favorite number." That label is associated to an input which we can make this
assertion on.

So instead of jest-dom, dom testing library gives us access to dom elements

# Use React Testing Library to Render and Test React Components

Let’s create a simple render method to be able to reuse this functionality for
our other tests. The render method we’ve created is similar to the render method
that’s provided by React Testing Library. Let’s swap our implementation to that!

So

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {getQueriesForElement} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  const queries = getQueriesForElement(container)
  return {container, ...queries}
}

test('renders a number input with a label "Favorite Number', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

gets replaced by:

```js
import React from 'react'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

OPull in render from `@testing-library/react`. We can get rid of that render
function we created. We can also get rid of the react DOM and testing library
DOM imports. That is all that we have left.
