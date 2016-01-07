# JSX Control Statements

[![Build Status](https://travis-ci.org/AlexGilleran/jsx-control-statements.svg?branch=master)](https://travis-ci.org/AlexGilleran/jsx-control-statements) [![Coverage Status](https://coveralls.io/repos/AlexGilleran/jsx-control-statements/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlexGilleran/jsx-control-statements?branch=master)

React and JSX are great, but to those of us who are used to dedicated templating libraries like Handlebars, the control
statements (e.g. if conditions and for loops) are a step backwards in terms of neatness and readability. What's worse is
that JSX is _perfectly capable_ of using the kind of conditional and looping logic we're used to, but it has to be done
through ugly use of ternary ifs and `Array.map`, or by doing this logic in javascript before you start defining your
actual view, which in my mind turns it into spaghetti.

Wouldn't it be easier if we could just have some syntactical sugar that turned neat `<If>`/`<Else />`/`</If>` and
`<For>`/`</For>` tags into ternary ifs and `Array.map`, so you could read your render functions a bit more easily?

So that's what this does. It's a Babel plugin that runs just before JSX transpilation and performs desugaring from
`<If>` -> ` ? : ` and `<For>` -> `Array.map`.

> *Note:* As of 3.0.0 the JSTransform version of jsx-control-statements is no longer supported, and has been separated out to https://github.com/AlexGilleran/jsx-control-statements-jstransform.

## Syntax
### If Tag

Define an `<If>` tag like so:

```
  <If condition={this.props.condition === 'blah'}>
    <span>IfBlock</span>
  <Else />
    <span>ElseBlock</span>
  </If>
```

or

```
  <If condition={this.props.condition === 'blah'}>
    <span>IfBlock</span>
  </If>
```

This will desugar into:

```
  this.props.condition === 'blah' ? (
    <span>IfBlock</span>
  ) : (
    <span>ElseBlock</span>
  )
```

or

```
  this.props.condition === 'blah' ? (
    <span>IfBlock</span>
  ) : null
```

`<If>` tags must have a `condition` attribute which is expected to be some kind of expression (i.e. contained within
`{}`. All the normal rules for putting JSX tags inside ternary ifs apply - the `<If>` block can only contain a single
tag, for instance.

### For Tag

Define `<For>` like so:

```
  <For each="blah" index="index" of={this.props.blahs}>
    <span key={blah}>{blah + this.somethingElse} at {index}</span>
  </For>
```

and this will desugar into:

```
  this.props.blahs.map(function(blah, index) { return (
    <span key={blah}>{blah + this.somethingElse} at {index}</span>
  )}, this)
```

The `<For>` tag expects an `each` attribute as a string (with `""` around it) - this is what you'll reference for each
item in the array - and an `of` attribute which is an expression (with `{}` around it) that refers to the array that
you'll loop through. You can also include an `index` attribute which will resolve to the index of the current item in
the array, but it's optional.

Note that a `<For>` *cannot* be at the root of a `render()` function in a React component, because then you'd
potentially have multiple components without a parent to group them which isn't allowed. As with `<If>`, the same rules
as using `Array.map()` apply - each element inside the loop should have a `key` attribute that uniquely identifies it.

To loop across an `Object`, use `Object.keys()` like so:

```
  <For each="blahKey" of={Object.keys(this.props.blahObj)}>
    <span key={blahKey}>{blahObj[blahKey]}</span>
  </For>
```

### Expressions as Children
As of 3.0.0 having a JSXExpression as a child of a JSX control statment is supported, i.e.

```
<If condition={foo}>
  {'foo'}
</If>
```

## Installation
[Use this guide](https://github.com/AlexGilleran/jsx-control-statements/wiki/Installation)

## Major Versions
- 3.x.x is a pure Babel plugin supporting Babel >= 6.
- 2.x.x was a Babel plugin supporting Babel >= 6, and a set of JSTransform visitors.
- 1.x.x was a Babel plugin supporting Babel <= 5, and a set of JSTransform visitors.

This used to support both JSTransform and Babel, but as JSTransform is no longer maintained support was dropped. You can
find the code for the JSTransform version at https://github.com/AlexGilleran/jsx-control-statements-jstransform.

## Why Bother Transforming?
See [here](https://github.com/AlexGilleran/jsx-control-statements/wiki/Why-Transform).
