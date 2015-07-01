var longDescriptions = {
  'user': 'Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.',
  'user:email': 'Grants read access to a user’s email addresses.',
  'user:follow': 'Grants access to follow or unfollow other users.',
  'public_repo': 'Grants read/write access to code, commit statuses, collaborators, and deployment statuses for public repositories and organizations. Also required for starring public repositories.',
  'repo':'Grants read/write access to code, commit statuses, collaborators, and deployment statuses for public and private repositories and organizations.',
  'repo_deployment': 'Grants access to deployment statuses for public and private repositories. This scope is only necessary to grant other users or services access to deployment statuses, without granting access to the code.',
  'repo:status': 'Grants read/write access to public and private repository commit statuses. This scope is only necessary to grant other users or services access to private repository commit statuses without granting access to the code.',
  'delete_repo': 'Grants access to delete adminable repositories.',
  'notifications': 'Grants read access to a user’s notifications. repo also provides this access.',
  'gist':'Grants write access to gists.',
  'read:repo_hook': 'Grants read and ping access to hooks in public or private repositories.',
  'write:repo_hook': 'Grants read, write, and ping access to hooks in public or private repositories.',
  'admin:repo_hook': 'Grants read, write, ping, and delete access to hooks in public or private repositories.',
  'admin:org_hook': 'Grants read, write, ping, and delete access to organization hooks. Note: OAuth tokens will only be able to perform these actions on organization hooks which were created by the OAuth application. Personal access tokens will only be able to perform these actions on organization hooks created by a user.',
  'read:org': 'Read-only access to organization, teams, and membership.',
  'write:org': 'Publicize and unpublicize organization membership.',
  'admin:org': 'Fully manage organization, teams, and memberships.',
  'read:public_key': 'List and view details for public keys.',
  'write:public_key': 'Create, list, and view details for public keys.',
  'admin:public_key': 'Fully manage public keys.'
};

Object.defineProperty(longDescriptions, 'none', {
  value:  'Grants read-only access to public information (includes public user profile info, public repository info, and gists)',
  enumerable: false,
  writable: false,
  configurable: false
});

/* istanbul ignore next */
(Object.freeze || Object)(longDescriptions);

var shortDescriptions = {
  'repo': 'Access private repositories',
  'repo:status': 'Access commit status',
  'repo_deployment': 'Access deployment status',
  'public_repo': 'Access public repositories',
  'delete_repo': 'Delete repositories',
  'user': 'Access all profile data',
  'user:email': 'Access user email addresses (read only)',
  'user:follow': 'Follow and unfollow users',
  'admin:org': 'Full control of orgs and teams',
  'write:org': 'Read and write org and team membership',
  'read:org': 'Read org and team membership',
  'admin:public_key': 'Full control of user public keys',
  'write:public_key': 'Write user public keys',
  'read:public_key': 'Read user public keys',
  'admin:repo_hook': 'Full control of repository hooks',
  'write:repo_hook': 'Write repository hooks',
  'read:repo_hook': 'Read repository hooks',
  'admin:org_hook': 'Full control of organization hooks',
  'gist': 'Create gists',
  'notifications': 'Access notifications'
};

Object.defineProperty(shortDescriptions, 'none', {
  value:  'Access public information',
  enumerable: false,
  writable: false,
  configurable: false
});

/* istanbul ignore next */
(Object.freeze || Object)(shortDescriptions);

var subsets = {
  'repo' : ['repo:status', 'repo_deployment', 'public_repo'],
  'user' : ['user:email', 'user:follow'],
  'admin:org' : ['write:org', 'read:org'],
  'write:org' : ['read:org'],
  'admin:public_key' : ['write:public_key', 'read:public_key'],
  'write:public_key' : ['read:public_key'],
  'admin:repo_hook' : ['write:repo_hook', 'read:repo_hook'],
  'write:repo_hook' : ['read:repo_hook']
};

function validate (scopes) {
  if (!scopes) return [];
  scopes.forEach(function (scope) {
    if (!isValid(scope)) {
      throw new Error('Invalid Scope: ' + scope);
    }
  });
  return scopes;
}

function isValid(scope) {
  return scope !== 'none' && shortDescriptions.hasOwnProperty(scope);
}

function reduce (scopes) {
  scopes = validate(scopes);
  var dict = {};
  scopes.forEach(function (scope) {
    dict[scope] = true;
  });
  scopes.forEach(function (scope) {
    if (subsets[scope]) {
      subsets[scope].forEach(function(sub){
        delete dict[sub];
      });
    }
  });
  return Object.keys(dict);
}

module.exports = {
  validate: validate,
  isValid: isValid,
  reduce: reduce,
  longDescriptions: longDescriptions,
  shortDescriptions: shortDescriptions
};


