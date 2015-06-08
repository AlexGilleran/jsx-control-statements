# JSX Control Statements

React and JSX are great, but to those of us who are used to dedicated templating libraries like Handlebars, the control
statements (e.g. if conditions and for loops) are a step backwards in terms of neatness and readability. What's worse is
that JSX is _perfectly capable_ of using the kind of conditional and looping logic we're used to, but it has to be done
through ugly use of ternary ifs and `Array.map`, or by doing this logic in javascript before you start defining your
actual view, which in my mind turns it into spaghetti.

Wouldn't it be easier if we could just have some syntactical sugar that turned neat `<If>`/`<Else />`/`</If>` and
`<For>`/`</For>` tags into ternary ifs and `Array.map`, so you could read your render functions a bit more easily?

So that's what this does. Depending on how you use it, it's either a Babel plugin (recommended) or a set of 
JSTransform visitors that run just before JSX transpilation (less recommended) and perform desugaring from
`<If>` -> ` ? : ` and `<For>` -> `Array.map`.

## Why Transform?!

Excellent question! You could easily just create actual React components that have _most_ of the same functionality 
(e.g. [React If](https://github.com/romac/react-if), which inspired this project). The problem is that because of the
way JSX works, everything inside an actual React component gets executed, whether it's actually used or not. So if you
have:

```
  <If condition={obj}>
    <div>{obj.name}<div>
  </If>
```

`obj.name` is going to be executed (and fail) even though you just guarded against it, which is both annoying and 
_incredibly_ unintuitive for new developers.

By transforming it into a ternary if instead, only code that's supposed to be executed will be executed, which is much
easier to read, even though it can require an extra build step if you use the JSTransform method.

## If Tag

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
  ) : ''
```

`<If>` tags must have a `condition` attribute which is expected to be some kind of expression (i.e. contained within 
`{}`. All the normal rules for putting JSX tags inside ternary ifs apply - the `<If>` block can only contain a single
tag, for instance.

## For Tag

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

## How To Use
First up, obviously:

```
  npm install --save-dev jsx-control-statements
```

### Babel Plugin
This is much easier to use than the other methods, and the code that it runs is better too, so I'd definitely recommend
this if you're running Babel.

How to use the plugin depends on how you configure Babel:

#### Node Require Hook
```
require("babel/register")({
  plugins: ["jsx-control-statements/babel"]
});
```

#### CLI
```
babel --plugins jsx-control-statements/babel script.js
```

#### .babelrc
```
{
  "plugins": ["jsx-control-statements/babel"]
}
```

#### Babelify
```
browserify({
  // etc etc
  transform: [
    babelify.configure({
      plugins: ["jsx-control-statements/babel"]
    })
  ]
});
```

### Webpack (without Babel)
For webpack you'll want to `npm install` the existing
[JSTransform Loader](https://github.com/conradz/jstransform-loader) and then chain it in front of your existing JSX
Loader, setting it to use the control statements visitors like so:

```
  {..., loader: 'jsx-loader!jstransform-loader?jsx-control-statements/jstransform'}
```

### Node-JSX
If you're using [Node-JSX](https://github.com/petehunt/node-jsx) to transpile inside node, you can just use the included
server transformer as an additional transform, which you pass in during the install of Node JSX.

```
var nodeJsx = require('node-jsx');
var serverTransformer = require('jsx-control-statements/server-transformer');

nodeJsx.install({
  extension: '.jsx',
  additionalTransform: serverTransformer
});
```

### Browserify (without Babel)
As with Webpack, use the Babel plugin if you're using Babel, otherwise you need to use [JSTransformify](https://github.com/andreypopp/jstransformify) to run the JSTransform visitors - doing this depends on how you use Browserify.

#### Command Line
```
browserify -t [ jstransformify -v jsx-control-statements/jstransform ] app.js > bundle.js
```

#### Gulp
This is a bit more involved given than I can't find a nice way to pass options to gulp-browserify. Unfortunately you have to do something a bit like this:
```
var jstransformify = require('jstransformify');
var jsxControlStatements = require('jsx-control-statements/jstransform');
var reactify = require('reactify'); 

function jsxControlStatementsify(filename) {
  return jstransformify(filename, {visitors: jsxControlStatements});
}

...
// (in your task)
  gulp.src('src/entry.js')
    .pipe(browserify({
      transform: [jsxControlStatementsify, reactify]
    }))
    .pipe(gulp.dest('./dist'));
```

### Others
These are the only ways that have been tried, but any other method that involves using JSTransform or Babel should be
applicable to jsx control statements.
