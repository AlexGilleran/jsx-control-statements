# Contributing to JSX Control Statements

JSX Control Statements loves pull requests, and it's benefited from the collaborative effort of several different individuals so far. Remember - the quickest way to get your feature request done or bug fixed is to do it yourself and submit a PR :).

## Building

Should be as easy as:
```
git clone git@github.com:AlexGilleran/jsx-control-statements.git
cd jsx-control-statements
npm install
```

## Testing
```
# To Run Tests:
npm run test

# To Run Coverage:
npm run cover
```

## Using Your Local Version With Your Own React Project
It's recommended, particularly if you've included a new feature, that you check that it works the way you expect against an actual React project. To use the version of jsx-control-statements that you're working on instead of the one in npm:

```
# (in jsx-control-statements directory)
npm link

# (in the root of your project, at the level of package.json)
npm link jsx-control-statements
```

## PR Submission Checklist
Before submitting a PR, make sure that you:
- Raise an issue for whatever bug or feature you're working on if none exists already - there might be extra detail we can give you on how to implement/fix it, or it might be better if it works slightly differently etc. etc. - it's better that we have a discussion *before* you waste your time writing code.
- Leave a comment to say that you're working on it, so multiple people aren't working on it at the same time. If the issue is already assigned to someone else, pick another one :).
- WRITE TESTS. Unless there's some really good reason why your PR doesn't need tests (like you've fixed a spelling mistake), tests are super super mandatory.
- When you submit your PR, make sure you leave a comment explaining what you did, and tag the issue # that it relates to.

Happy Hacking :).
