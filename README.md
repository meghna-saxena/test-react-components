<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Intro to Test React Components with Jest and React Testing Library](#intro-to-test-react-components-with-jest-and-react-testing-library)

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
