# github-oauth-scopes

utility for processing github oath scopes

[![Build Status](https://travis-ci.org/jamestalmage/github-auth-scopes.svg)](https://travis-ci.org/jamestalmage/github-auth-scopes)
[![Coverage Status](https://coveralls.io/repos/jamestalmage/github-auth-scopes/badge.svg)](https://coveralls.io/r/jamestalmage/github-auth-scopes)

```javascript
var ghScopes = require('github-oath-scopes');

ghScopes.isValid('repo'); // true
ghScopes.isValid('bad_scope'); // false

ghScopes.validate(['repo','bad_scope']); // throws an error
ghScopes.validate(['repo']);             // returns the array
ghScopes.validate(null | undefined);     // returns an empty array

// eliminate redundant scopes
ghScopes.reduce(['repo', 'repo:status']); // returns ['repo'];

ghScopes.longDescriptions; // a map of scopes to detailed descriptions
ghScopes.shortDescriptions; // a map of scopes to tool-tip ready descriptions
```