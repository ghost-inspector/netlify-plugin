const assert = require('assert').strict
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('plugin', function () {
  const consoleLogSpy = sinon.stub(console, 'log')
  let gitHubStub
  let build

  beforeEach(function () {
    consoleLogSpy.resetHistory()
    gitHubStub = sinon.stub()
    // import the module to test, using a fake dependency
    build = proxyquire('../index.js', {
      './github': {
        updateGithubStatus: gitHubStub,
      },
    })
  })

  describe('onPreBuild()', () => {
    it('should exit early and log to console if not called while in deploy preview', async function () {
      process.env.CONTEXT = 'not-deploy-preview'
      await build.onPreBuild()
      assert.ok(consoleLogSpy.calledOnceWith('Not in deploy-preview. Skipping Ghost Inspector tests.'))
    })
  
    it('should exit without any action if GitHub API token is not set', async function () {
      process.env.CONTEXT = 'deploy-preview'
      delete process.env.GITHUB_API_TOKEN
      await build.onPreBuild()
      assert.ok(consoleLogSpy.notCalled)
      assert.ok(gitHubStub.notCalled)
    })
  
    it('should update GitHub status if API token is set', async function () {
      process.env.CONTEXT = 'deploy-preview'
      process.env.GITHUB_API_TOKEN = '123'
      await build.onPreBuild()
      assert.ok(consoleLogSpy.notCalled)
      assert.ok(gitHubStub.calledOnce)
      assert.equal(gitHubStub.getCall(0).args[0].auth, '123')
      assert.equal(gitHubStub.getCall(0).args[0].state, 'pending')
    })
  })

  describe('onSuccess()', () => {
    it('should exit early and log to console if not called while in deploy preview', async function () {
      process.env.CONTEXT = 'not-deploy-preview'
      await build.onSuccess({})
      assert.ok(consoleLogSpy.calledOnceWith('Not in deploy-preview. Skipping Ghost Inspector tests.'))
    })

    it('should exit early and log to console if no deploy URL is set', async function () {
      process.env.CONTEXT = 'deploy-preview'
      delete process.env.DEPLOY_PRIME_URL
      await build.onSuccess({})
      assert.ok(consoleLogSpy.calledOnceWith('No deployUrl. Skipping Ghost Inspector tests.'))
    })

    it('should fail plugin if no Ghost Inspector API key is set', async function () {
      const failPluginStub = sinon.stub()
      process.env.CONTEXT = 'deploy-preview'
      process.env.DEPLOY_PRIME_URL = 'www'
      delete process.env.GHOST_INSPECTOR_API_KEY
      await build.onSuccess({ utils: { build: { failPlugin: failPluginStub }}})
      assert.ok(consoleLogSpy.notCalled)
      assert.ok(failPluginStub.calledOnceWith('Missing env variable for GHOST_INSPECTOR_API_KEY'))
    })

    it('should fail plugin if no Ghost Inspector suite ID is set', async function () {
      const failPluginStub = sinon.stub()
      process.env.CONTEXT = 'deploy-preview'
      process.env.DEPLOY_PRIME_URL = 'www'
      process.env.GHOST_INSPECTOR_API_KEY = '123'
      delete process.env.GHOST_INSPECTOR_SUITE
      await build.onSuccess({ utils: { build: { failPlugin: failPluginStub }}})
      assert.ok(consoleLogSpy.notCalled)
      assert.ok(failPluginStub.calledOnceWith('Missing env variable for GHOST_INSPECTOR_SUITE'))
    })
  })
})
