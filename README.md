<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Intro to Test React Components with Jest and React Testing Library](#intro-to-test-react-components-with-jest-and-react-testing-library)
- [Render a React Component for testing using ReactDOM](#render-a-react-component-for-testing-using-reactdom)
- [Use Jest DOM for improved assertions](#use-jest-dom-for-improved-assertions)
- [Use DOM Testing Library to Write More Maintainable React Tests](#use-dom-testing-library-to-write-more-maintainable-react-tests)
- [Use React Testing Library to Render and Test React Components](#use-react-testing-library-to-render-and-test-react-components)
- [Debug the DOM State During Tests using React Testing Library’s debug Function](#debug-the-dom-state-during-tests-using-react-testing-librarys-debug-function)
- [Test React Component Event Handlers with fireEvent from React Testing Library](#test-react-component-event-handlers-with-fireevent-from-react-testing-library)
- [Improve Test Confidence with the User Event Module](#improve-test-confidence-with-the-user-event-module)
- [Test Prop Updates with React Testing Library](#test-prop-updates-with-react-testing-library)
- [Assert That Something is NOT Rendered with React Testing Library](#assert-that-something-is-not-rendered-with-react-testing-library)

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

# Debug the DOM State During Tests using React Testing Library’s debug Function

```js
const {getByLabelText, debug} = render(<FavoriteNumber />)
debug()
```

Tests continues to pass, but I can see what the DOM looks like at this point in
time. I can move it down to the bottom of my test and see what it looks like at
that point in time.

If I want to look at a specific DOM node, then I can pass it as an argument to
debug and get only the output for that particular DOM node, `debug(input)`. To
do this, we simply bring in the debug method from the object that's returned
from calling render, and then we can call debug at any point in time with or
without an argument.

# Test React Component Event Handlers with fireEvent from React Testing Library

The `fireEvent` utility in React Testing Library supports all the events that
you regularly use in the web (change, click, etc.). Let’s see how we can test
our change event handler with an input

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: '10'}})
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
```

In review, to make this work, we simply got the `getByLabelText` and `getByRole`
by rendering favorite number. We'll get the input by its label text. We'll fire
a change event on the input. We want that input's value to be 10. Then we can
expect `getByRole('alert')` to have the text content, "The number is invalid."

# Improve Test Confidence with the User Event Module

The User Event module is part of the Testing Library family of tools and lets
you fire events on DOM nodes that more closely resemble the way your users will
interact with your elements. Let’s refactor our fire event usages to use that
instead.

When a user makes a change to an input, there are typically a couple browser
events that are going to happen. The input is going to receive a focus event.
It's going to receive specific input like keydown, keyup, all of those different
kinds of events that are going on.

Here, we're only firing a change event. Our test is not exactly representing
what the user is going to be experiencing when they're interacting with our
component. Most of the time, this isn't all that problematic. Using fireEvent
the way we are, it works just fine, but sometimes it can be a problem.

If you want to really resemble the way that your software is being used, then I
recommend that you give this module a look. We're going to import user from
'@testing-library/user-event'. user has a couple methods on it that we can call.

The user event module in the testing library family uses fireEvent to fire a
whole bunch of events that will typically happen when a user types into an
input, like the keydown, the keyup, as well as the change event.

```js
import user from '@testing-library/user-event'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  // fireEvent.change(input, {target: {value: '10'}})
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
```

# Test Prop Updates with React Testing Library

Sometimes it can be useful to change the props of a component you’ve rendered
and make assertions about what’s rendered after that prop change has taken
place. Let’s see how to go about doing this with React Testing Library.

One situation that you sometimes run across is what happens if I re-render this
FavoriteNumber, given its current state with new props? For example, I could
take this FavoriteNumber and re-render it at the bottom of our file with a max
of 10. That would mean that the input that the user typed is within the limit.

pull in `rerender` from a render call up here and we'll rerender FavoriteNumber
with a max of 10. Let's go ahead and grab debug from our render call and I'll
add a debug before and after that rerender.

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, rerender, debug} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  debug()
  rerender(<FavoriteNumber max={10} />)
  debug()
})
```

We'll save that and we'll take a look at our test. Here, we'll see that the
number is invalid, shows up on that first debug and then on the second debug, we
see that the error message is no longer present. In review, if you need to
re-render that same component with new props, you simply use the re-render
method that you get back from render.

`Re-render will take the UI that you provide to it and render that UI through the exact same container that it's rendering your original UI to, allowing you to test situations when props are updated.`

# Assert That Something is NOT Rendered with React Testing Library

It’s pretty straightforward to assert that a certain element is rendered with
react-testing-library, but what if we want to ensure that something is NOT being
rendered. For example, if we re-render our component with a different maximum
amount leading to the error message being hidden. Let’s see how we can use the
query\* APIs from react-testing-library to assert that certain elements are not
rendered.

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, rerender} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  rerender(<FavoriteNumber max={10} />)
})
```

Now, I'm going to just hold this over the same expect line and we'll say,
toBeNull(). That should no longer be rendered at all.

```js
expect(getByRole('alert')).toBeNull()
```

The problem is that getByRole, any get prefixed query getByLabelText, getByRole,
getByAll the text, any of this are going to through an error if it can't find
the element that it's supposed to be matching.

That is why queryByRole exists.
`Any query that starts with the text query is going to return null instead of throwing an error`.if
we use queryByRole and then open up our tests, our tests are passing now.

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, queryByRole, rerender} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  rerender(<FavoriteNumber max={10} />)
  expect(queryByRole('alert')).toBeNull()
})
```

Typically, using 'get' will leave you with much better error messages, but if
you do need to verify that an element is not rendered, then using a query
function is the way to go.
