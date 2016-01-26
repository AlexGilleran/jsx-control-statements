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

> *Note:* As of 3.0.0 the JSTransform version of jsx-control-statements is no longer supported, and has been separated
out to https://github.com/AlexGilleran/jsx-control-statements-jstransform.

## Installation
As a prerequisite you need to have [Babel](https://github.com/babel/babel) installed and configured in your project.

Install via npm:

```
  npm install --save-dev jsx-control-statements
```

Then you only need to specify *JSX-Control-Statements* as Babel plugin, which you would typically do in your `.babelrc`:
```
{
  ...
  "plugins": ["jsx-control-statements"]
}
```
However, Babel can be used and configured in many different ways, so
[use this guide](https://github.com/AlexGilleran/jsx-control-statements/wiki/Installation) to pick a configuration
which fits your setup.

### Linting
Since all control statements are transformed via Babel, no `require` or `import` calls are needed. This in turn
(well, and some more cases) would lead to warnings or errors by ESLint about undefined variables.

But fortunately you can use this
[ESLint plugin for *JSX-Control-Statements*](https://github.com/vkbansal/eslint-plugin-jsx-control-statements)
to happily lint your code.

## Syntax
### If Tag

Define an `<If>` tag like so:

```
  // desugars into: this.props.myCondition ? <span>IfBlock</span> : null
  <If condition={this.props.myCondition}>
    <span>IfBlock</span>
  </If>

  // desugars into: this.props.myCondition === 'maybe' ? <span>IfBlock</span> : <span>ElseBlock</span>
  <If condition={this.props.myCondition === 'maybe'}>
    <span>IfBlock</span>
  <Else />
    <span>ElseBlock</span>
  </If>

  // using multiple child elements and / or expressions is supported
  // desugars into: true ? ['1st part', <span>2nd part</span>, <span>3rd part</span>] : null
  <If condition={true}>
    {'1st part'}
    <span>2nd part</span>
    <span>3rd part</span>
  </If>
```


`<If>` tags must have a `condition` attribute which is expected to be or return a boolean expression (i.e. contained
within `{}`).

### Choose Tag

This is an alternative syntax for more complex conditional statements. The syntax itself is XMLish and conforms by and
large to JSTL or XSLT:

```
<choose>
  <when condition={myCondition}>
    <span>IfBlock</span>
  </when>
  <when condition={myOtherCondition}>
    <span>ElseIfBlock</span>
    <span>Another ElseIfBlock</span>
    <span>...</span>
  </when>
  <default>
    <span>ElseBlock</span>
  </default>
</choose>

// default block is optional; minimal example:
<choose>
  <when condition={true}>
    <span>IfBlock</span>
  </when>
</choose>
```
Each `choose` statement requires at least one `when` block, but may contain as many `when` blocks as desired. Each
`when` block in turn requires a `condition` attribute which must be an expression. The `default` block is optional.

This syntax desugars into a (sequence of) ternary operator(s).

### For Tag

Define `<For>` like so:
```
  //  desugars into:
  //  this.props.items.map(function(item) {
  //    <span key={item.id}>{item.title}</span>
  //  }
  <For each="item" of={this.props.items}>
    <span key={item.id}>{item.title}</span>
  </For>

  <For each="item" index="idx" of={ [1,2,3] }>
    <span key={idx}>{item}</span>
    <span key={idx + '_2'}>Static Text</span>
  </For>
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


## Major Versions
- 3.x.x is a pure Babel plugin supporting Babel >= 6.
- 2.x.x was a Babel plugin supporting Babel >= 6, and a set of JSTransform visitors.
- 1.x.x was a Babel plugin supporting Babel <= 5, and a set of JSTransform visitors.

This used to support both JSTransform and Babel, but as JSTransform is no longer maintained support was dropped. You can
find the code for the JSTransform version at https://github.com/AlexGilleran/jsx-control-statements-jstransform.

## Why Bother Transforming?
See [here](https://github.com/AlexGilleran/jsx-control-statements/wiki/Why-Transform).

## I Want to Contribute!
Yay! Please read the [Contributor's Guide](https://github.com/AlexGilleran/jsx-control-statements/blob/master/CONTRIBUTING.md).
