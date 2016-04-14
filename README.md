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

Used to express the most simple conditional logic.

```javascript
// simple
<If condition={ true }>
  <span>IfBlock</span>
</If>

// using multiple child elements and / or expressions
<If condition={ true }>
  1st part
  { "2nd part" }
  <span>3rd part</span>
  <span>4th part</span>
</If>
```
#### &lt;If&gt;
The body of the if statement only gets evaluated if `condition` is true.

Prop Name | Prop Type | Required
--------- | --------- | --------
condition | boolean | :white_check_mark:

#### &lt;Else /&gt; (deprecated)
The else element has no properties and demarcates the `else` branch.

This element is deprecated, since it's bad JSX/XML semantics and breaks auto-formatting.
Please use `<Choose>` instead.

#### Transformation
If statements transform to the *ternary operator*:
```javascript
// before transformation
<If condition={ test }>
  <span>Truth</span>
</If>

// after transformation
{ test ? <span>Truth</span> : null }
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
Acts as a simple container and only allows for `<Choose>` and `<Otherwise>` as children.
Each `<Choose>` statement requires at least one `<When>` block but may contain as many as desired.
The `<Otherwise>` block is optional.

#### &lt;When&gt;
Analog to `<If>`.

Prop Name | Prop Type | Required
--------- | --------- | --------
condition | boolean | :white_check_mark:

#### &lt;Otherwise&gt;
`<Otherwise>` has not attributes and demarcates the else branch of the conditional.

#### Transformation
This syntax desugars into a (sequence of) ternary operator(s).

```javascript
// Before transformation
<Choose>
  <When condition={ test1 }>
    <span>IfBlock1</span>
  </When>
  <When condition={ test2 }>
    <span>IfBlock2</span>
  </When>
  <Otherwise>
    <span>ElseBlock</span>
  </Otherwise>
</Choose>

// After transformation
{ test1 ? <span>IfBlock1</span> : test2 ? <span>IfBlock2</span> : <span>ElseBlock</span> }
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

Prop Name | Prop Type | Required | description
--------- | --------- | -------- | -----------
of | array or collection(Immutable) | :white_check_mark: | the array to iterate over. This can also be a collection (Immutable.js) or anything on which a function with the name `map` can be called
each | string | | a reference to the current item of the array which can be used within the body as variable
index | string | | a reference to the index of the current item which can be used within the body as variable

Note that a `<For>` *cannot* be at the root of a `render()` function in a React component, because then you'd
potentially have multiple components without a parent to group them which isn't allowed. As with `<If>`, the same rules
as using `Array.map()` apply - each element inside the loop should have a `key` attribute that uniquely identifies it.

#### Transformation
There is no implementation for the map function within *jsx-control-statements*. We only expect that a
function can be called on the passed object (to the `of` attribute) which has the same signature as `Array.map`.

```javascript
// before transformation
<For each="item" index="index" of={ items )}>
  <span key={ item.id }>{ index }. { item.title }</span>
</For>

// after transformation
{
  items.map( function(item, index) {
    <span key={ item.id }>{ index }. { item.title }</span>
  })
}
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
