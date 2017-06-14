describe("Repos service", function() {
  var Repos,
      data = [];

  // load myRepos module
  beforeEach(angular.mock.module('githubExplorer'));

  beforeEach(inject(function(_Repos_) {
    Repos = _Repos_;
  }));

  it("should exist", function() {
    expect(Repos).toBeDefined();
  });

  describe('.all()', function() {
    it('should exist', function() {
      expect(Repos.all).toBeDefined();
    });
  });

});
