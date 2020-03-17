# JSX Control Statements

[![Build Status](https://travis-ci.org/AlexGilleran/jsx-control-statements.svg?branch=master)](https://travis-ci.org/AlexGilleran/jsx-control-statements) [![Coverage Status](https://coveralls.io/repos/AlexGilleran/jsx-control-statements/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlexGilleran/jsx-control-statements?branch=master) [![npm version](https://img.shields.io/npm/v/babel-plugin-jsx-control-statements.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-jsx-control-statements)

_JSX-Control-Statements_ is a Babel plugin that extends JSX to add basic control statements: **conditionals** and **loops**.
It does so by transforming component-like control statements to their JavaScript counterparts - e.g. `<If condition={condition()}>Hello World!</If>` becomes `condition() ? 'Hello World!' : null`.

Developers coming to React from using JavaScript templating libraries like Handlebars are often surprised that there's no built-in looping or conditional syntax. This is by design - JSX by is not a templating library, it's declarative syntactic sugar over functional JavaScript expressions. JSX Control Statements follows the same principle - it provides a component-like syntax that keeps your `render` functions neat and readable, but desugars into clean, readable JavaScript.

The only dependency _JSX-Control-Statements_ relies upon is _Babel_. It is compatible with React and React Native.

:skull_and_crossbones: Beware: This is a Babel plugin. It changes your code to other code - this means that some tooling that looks at your code (e.g. static analysis, typescript) is likely to not work. This plugin dates back to when JSX was daring and Javascript was more like playdough than meccano - if you want to stay on the well-trodden path stick with writing `&&` and `map`.

## Table of Contents

- [A Note on Transformation and Alternative Solutions](#a-note-on-transformation-and-alternative-solutions)
- [Installation](#installation)
- [Syntax](#syntax)
  - [If Tag](#if-tag)
    - [`<If>`](#if)
    - [`<Else ></Else>` (deprecated)](#else)
    - [Transformation](#transformation-1)
  - [Choose Tag](#choose-tag)
    - [`<Choose>`](#choose)
    - [`<When>`](#when)
    - [`<Otherwise>`](#otherwise>)
    - [Transformation](#transformation-2)
  - [For Tag](#for-tag)
    - [Transformation](#transformation-3)
  - [With Tag](#with-tag)
    - [Transformation](#transformation-4)
- [Linting](#linting)
  - [ESLint](#eslint)
  - [FlowType](#flowtype)
- [Alternative Solutions](#alternative-solutions)
  - [Pure JavaScript](#pure-javascript)
    - [Conditionals](#conditionals)
    - [Loops](#loops)
    - [Comparison](#comparison)
  - [React Components](#react-components)
- [What about Typescript](#what-about-typescript)
- [Major Versions](#major-versions)
- [I Want to Contribute!](#i-want-to-contribute)

### A Note on Transformation and Alternative Solutions

It appears to be pretty easy to implement **conditionals as React component**, which is underlined by the amount
of libraries which have taken this approach. However, all of them suffer from the same major caveat: A React component
will always evaluate all of its properties including the component body. Hence the following example will fail for
those libraries:

```javascript
<IfComponent condition={item}>{item.title}</IfComponent>
```

The error will be "Cannot read property 'title' of undefined", because React will evaluate the body of the custom
component and pass it as "children" property to it. The only workaround is to force React into lazy evaluation by
wrapping the statement in a function.

This is the reason why conditionals must be implemented in pure JS. _JSX-Control-Statements_ only adds the
syntactic sugar to write conditionals as component, while it transforms this "component" to a pure JS expression.

See [Alternative Solutions](#alternative-solutions) for a more detailed comparison and pure JS solutions.

## Installation

As a prerequisite you need to have [Babel](https://github.com/babel/babel) installed and configured in your project.

Install via npm:

```
  npm install --save-dev babel-plugin-jsx-control-statements
```

Then you only need to specify _JSX-Control-Statements_ as Babel plugin, which you would typically do in your `.babelrc`.

```
{
  ...
  "plugins": ["jsx-control-statements"]
}
```

If you use the `transform-react-inline-elements` plugin, place it _after_ `jsx-control-statements`:

```
{
  ...
  "plugins": ["jsx-control-statements", "transform-react-inline-elements"]
}
```

Babel can be used and configured in many different ways, so
[use this guide](https://github.com/AlexGilleran/jsx-control-statements/wiki/Installation) to pick a configuration
which fits your setup.

## Syntax

### If Tag

Used to express the most simple conditional logic.

```javascript
// simple
<If condition={ true }>
  <span>IfBlock</span>
</If>

// using multiple child elements and / or expressions
<If condition={ true }>
  one
  { "two" }
  <span>three</span>
  <span>four</span>
</If>
```

#### &lt;If&gt;

The body of the if statement only gets evaluated if `condition` is true.

| Prop Name | Prop Type | Required           |
| --------- | --------- | ------------------ |
| condition | boolean   | :white_check_mark: |

#### _&lt;Else /&gt; (deprecated)_

The else element has no properties and demarcates the `else` branch.

This element is deprecated, since it's bad JSX/XML semantics and breaks auto-formatting.
Please use `<Choose>` instead.

#### Transformation

If statements transform to the _ternary operator_:

```javascript
// before transformation
<If condition={test}>
  <span>Truth</span>
</If>;

// after transformation
{
  test ? <span>Truth</span> : null;
}
```

### Choose Tag

This is an alternative syntax for more complex conditional statements. The syntax itself is XMLish and conforms by and
large to JSTL or XSLT (the attribute is called `condition` instead of `test`):

```javascript
<Choose>
  <When condition={ test1 }>
    <span>IfBlock</span>
  </When>
  <When condition={ test2 }>
    <span>ElseIfBlock</span>
    <span>Another ElseIfBlock</span>
    <span>...</span>
  </When>
  <Otherwise>
    <span>ElseBlock</span>
  </Otherwise>
</Choose>

// default block is optional; minimal example:
<Choose>
  <When condition={true}>
    <span>IfBlock</span>
  </When>
</Choose>
```

#### &lt;Choose&gt;

Acts as a simple container and only allows for `<When>` and `<Otherwise>` as children.
Each `<Choose>` statement requires at least one `<When>` block but may contain as many as desired.
The `<Otherwise>` block is optional.

#### &lt;When&gt;

Analog to `<If>`.

| Prop Name | Prop Type | Required           |
| --------- | --------- | ------------------ |
| condition | boolean   | :white_check_mark: |

#### &lt;Otherwise&gt;

`<Otherwise>` has no attributes and demarcates the else branch of the conditional.

#### Transformation

This syntax desugars into a (sequence of) ternary operator(s).

```javascript
// Before transformation
<Choose>
  <When condition={test1}>
    <span>IfBlock1</span>
  </When>
  <When condition={test2}>
    <span>IfBlock2</span>
  </When>
  <Otherwise>
    <span>ElseBlock</span>
  </Otherwise>
</Choose>;

// After transformation
{
  test1 ? (
    <span>IfBlock1</span>
  ) : test2 ? (
    <span>IfBlock2</span>
  ) : (
    <span>ElseBlock</span>
  );
}
```

### For Tag

Define `<For>` like so:

```javascript
  // you must provide the key attribute yourself
  <For each="item" of={ this.props.items }>
    <span key={ item.id }>{ item.title }</span>
  </For>

  // using the index as key attribute is not stable if the array changes
  <For each="item" index="idx" of={ [1,2,3] }>
    <span key={ idx }>{ item }</span>
    <span key={ idx + '_2' }>Static Text</span>
  </For>
```

| Prop Name | Prop Type                      | Required           | description                                                                                                                               |
| --------- | ------------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| of        | array or collection(Immutable) | :white_check_mark: | the array to iterate over. This can also be a collection (Immutable.js) or anything on which a function with the name `map` can be called |
| each      | string                         |                    | a reference to the current item of the array which can be used within the body as variable                                                |
| index     | string                         |                    | a reference to the index of the current item which can be used within the body as variable                                                |

Note that a `<For>` _cannot_ be at the root of a `render()` function in a React component, because then you'd
potentially have multiple components without a parent to group them which isn't allowed. As with `<If>`, the same rules
as using `Array.map()` apply - each element inside the loop should have a `key` attribute that uniquely identifies it.

#### For Tag - Alternative Syntax

For those using Typescript, the previous syntax introduces several issues with undefined variables. To deal with this issue, we introduce a following syntax, inspired by [tsx-control-statements](https://www.npmjs.com/package/tsx-control-statements).

```javascript
// before transformation
<For
  of={items}
  body={(item, index) => (
    <span key={item.id}>
      {index}. {item.title}
    </span>
  )}
/>;

// after transformation
{
  items.map(function(item, index) {
    <span key={item.id}>
      {index}. {item.title}
    </span>;
  });
}
```

| Prop Name | Prop Type                      | Required           | description                                                                                                                               |
| --------- | ------------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| of        | array or collection(Immutable) | :white_check_mark: | the array to iterate over. This can also be a collection (Immutable.js) or anything on which a function with the name `map` can be called |
| body      | map expression                 |                    | expression of the map statement                                                                                                           |

### With Tag

Used to assign values to local variables:

```javascript
// simple
<With foo={ 47 } bar={ 'test' }>
  <span>{ foo }</span>
  <span>{ bar }</span>
</With>

// nested
<With foo={ 47 }>
  <With bar={ 'test' }>
    <span>{ foo }</span>
    <span>{ bar }</span>
  </With>
</With>
```

| Prop Name | Prop Type | Required | description                                              |
| --------- | --------- | -------- | -------------------------------------------------------- |
| any name  | any type  |          | assign prop value to a local variable named by prop name |

You may assign multiple variables with a single `<With>` statement. The defined variable is
available only within the `<With>` block.

#### Transformation

`<With>` statements transform to immediately-invoked function expressions:

```javascript
// before transformation
<With foo={47}>
  <span>{foo}</span>
</With>;

// after transformation
{
  (function(foo) {
    return <span>{foo}</span>;
  }.call(this, 47));
}
```

## Linting

### ESLint

Since all control statements are transformed via Babel, no `require` or `import` calls are needed. This in turn
(well, and some more cases) would lead to warnings or errors by ESLint about undefined variables.

But fortunately you can use this
[ESLint plugin for _JSX-Control-Statements_](https://github.com/vkbansal/eslint-plugin-jsx-control-statements)
to lint your code.

### FlowType

There's still not a perfect solution for FlowType given that it doesn't provide a lot of plugin functionality
(at least not yet). Flow definitions are available in `jsx-control-statements.latest.flow.js` for Flow >= 0.53, or `jsx-control-statements.flow.js` (deprecated) for Flow < 0.53 - you can pick which file to use [like this](https://github.com/AlexGilleran/jsx-control-statements/pull/68#issuecomment-323562980). These will stop the
type checker complaining about statements being undeclared. As of now there's no neat way to make the Flow checker
recognise `each` attributes in `<For>` loops as a variable - the best workaround for now is something like:

```javascript
render() {
  declare var eachVariable: string;

  return (
    <For each="eachVariable" of={["hello", "world"]}>
      {eachVariable}
    </For>
  );
}
```

If you know of a better way to work around this please let us know!

## Alternative Solutions

### Pure JavaScript

Since everything will be compiled to JavaScript anyway, you might prefer to stick to pure JavaScript solutions.

#### Conditionals

Probably the most common way for simple conditionals is the use of the && operator:

```javascript
// simple if
{
  test && <span>true</span>;
}

// additionally the else branch
{
  !test && <span>false</span>;
}
```

The ternary operator is probably more elegant for if / else conditionals:

```javascript
// simple
{
  test ? <span>true</span> : <span>false</span>;
}

// with multiple children
{
  test ? (
    [<span key="1">one</span>, <span key="2">two</span>]
  ) : (
    <span>false</span>
  );
}
```

Another approach is to refactor your conditional into a function:

```javascript
testFunc(condition){
  if(condition) {
    return <span>true</span>;
  }
  else {
    return <span>false</span>
  }
}

render() {
  return (
    <div>{ testFunc(test) }</div>
  )
}
```

#### Loops

Not many options here:

```javascript
{
  items.map(function(item) {
    <span key={item.id}>{item.title}</span>;
  });
}
```

#### Comparison

Arguments pro _JSX-Control-Statements_ in comparison to pure JS solutions:

- More intuitive and easier to handle for designers and people with non-heavy JS background
- JSX does not get fragmented by JS statements
- Better readability and neatness, but that probably depends on you

Cons:

- Penalty on build-time performance
- Depends on Babel 6
- Some Babel configuration

### React Components

There are a reasonable amount of React components for conditionals (e.g. [react-if](https://github.com/romac/react-if), which inspired this in the first place), _JSX-Control-Statements_ is the only approach we know of that avoids execution of all branches (see the [intro section](#a-note-on-transformation-and-alternative-solutions)), and there seems to be no other component-based solution to looping - while it would be possible to make a component that renders everything in `props.children` for every element of an array, you'd have to access the members of the array in that component instead of the one that uses it.

For more discussion on `If` in React by the react team, have a look at https://github.com/reactjs/react-future/issues/35.

To sum up:

- Conditionals don't execute invalid paths
- Loops with variable references to each element and index are made possible
- No penalty on runtime performance
- No import / require statements needed to use control statements
- It works exactly as JSX is supposed to work: Plain syntactic sugar

Cons:

- Depends on Babel 6
- Some Babel configuration
- Slightly longer build times
- Requires an extra plugin to work with ESLint

## What about Typescript?

[There's a version for that by @KonstantinSimeonov!](https://github.com/KonstantinSimeonov/tsx-control-statements)

## Major Versions

- 4.x.x is a pure Babel plugin supporting Babel >= 7.
- 3.x.x is a pure Babel plugin supporting Babel >= 6.
- 2.x.x was a Babel plugin supporting Babel >= 6, and a set of JSTransform visitors.
- 1.x.x was a Babel plugin supporting Babel <= 5, and a set of JSTransform visitors.

This used to support both JSTransform and Babel, but as JSTransform is no longer maintained support was dropped. You can
find the code for the JSTransform version at https://github.com/AlexGilleran/jsx-control-statements-jstransform.

## I Want to Contribute!

Yay! Please read the [Contributor's Guide](https://github.com/AlexGilleran/jsx-control-statements/blob/master/CONTRIBUTING.md).
