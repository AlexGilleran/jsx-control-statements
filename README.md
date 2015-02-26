# JSX Control Statements

React and JSX are great, but to those of us who are used to dedicated templating libraries like Handlebars, the control
statements (e.g. if conditions and for loops) are a step backwards in terms of neatness and readability. What's worse is
that JSX is _perfectly capable_ of using the kind of conditional and looping logic we're used to, but it has to be done
through ugly use of ternary ifs and `Array.map`, or by doing this logic in javascript before you start defining your
actual view, which in my mind turns it into spaghetti.

Wouldn't it be easier if we could just have some syntactical sugar that turned neat `<If>`/`<Else />`/`</If>` and
<For>`/`</For>` tags into ternary ifs and `Array.map`, so you could read your render functions a bit more easily?

So that's what this does. Basically it's a set of JSTransform (the same technology that underpins JSX->JS transpilation)
visitors that run just before JSX transpilation and perform desugaring from `<If>` -> ` ? : ` and `<For>` ->
`Array.map`.

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

`<If>` tags must have a `condition` attribute which is expected to be some kind of expression (i.e. contained within `{}`. All the normal rules for putting JSX tags inside ternary ifs apply - the `<If>` block can only contain a single tag, for instance.

## For Tag

Define `<For>` like so:

```
  <For each="blah" of={this.props.blahs}>
    <span key={blah}>{blah + this.somethingElse}</span>
  </For>
```

and this will desugar into:

```
  this.props.blahs.map(function(blah) { return (
    <span key={blah}>{blah + this.somethingElse}</span>
  )}, this)
```

The `<For>` tag expects an `each` attribute as a string (with `""` around it) - this is what you'll reference for each item in the array - and a `of` attribute which is an expression (with `{}` around it) that refers to the array that you'll loop through.

Note that a `<For>` *cannot* be at the root of a `render()` function in a React component, because then you'd potentially have multiple components without a parent to group them which isn't allowed. As with `<If>`, the same rules as using `Array.map()` apply - each element inside the loop should have a `key` attribute that uniquely identifies it.
