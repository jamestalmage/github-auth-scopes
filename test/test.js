describe('github-oauth-scopes', function() {
  var assert = require('assert');
  var scopes = require('..');

  describe('isValid', function() {
    it('"none" is not a valid scope', function() {
      assert.strictEqual(scopes.isValid('none'), false);
    });

    it('"bad_scope" is not a valid scope', function() {
      assert.strictEqual(scopes.isValid('none'), false);
    });

    it('"repo" is a valid scope', function() {
      assert.strictEqual(scopes.isValid('repo'), true);
    });
  });

  describe('validate', function() {
    it('passes with a valid list', function() {
      var s = scopes.validate(['repo','user:email']);
      assert.deepEqual(s, ['repo', 'user:email']);
    });

    it('fails with an invalid valid list', function() {
      assert.throws(function(){
        scopes.validate(['repo','bad_scope']);
      });
    });

    it('returns an empty array if passed nothing', function() {
      assert.deepEqual(scopes.validate(), []);
    });
  });

  describe('reduce', function () {
    it('repo', function() {
      var s = scopes.reduce(['repo', 'repo:status', 'repo_deployment', 'public_repo']);
      assert.deepEqual(s, ['repo']);
    });

    it('repo, user', function() {
      var s = scopes.reduce(['repo', 'repo:status', 'user', 'user:email']);
      assert.deepEqual(s, ['repo', 'user']);
    });
  });


});