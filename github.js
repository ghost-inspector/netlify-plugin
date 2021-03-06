const { Octokit } = require("@octokit/rest")

/**
 * Update a commit status in GitHub
 *
 * @param {String} auth - The GitHub personal token
 * @param {String} sha - The GitHub commit hash that will be updated
 * @param {String} state - The status to set
 * @param {String} description - The Rich Media description
 * @param {String} target_url - The URL to add to the commit message
 *
 * @returns Promise
 */
module.exports = {
  updateGithubStatus: async ({
    auth,
    sha,
    state,
    description,
    // eslint-disable-next-line camelcase
    target_url,
  }) => {
    try {
      const octokit = new Octokit({ auth })
      const [owner, repoWithGit] = process.env.REPOSITORY_URL.split(
        "github.com/"
      )[1].split("/")
      const repo = repoWithGit.split('.git')[0]
      await octokit.request("POST /repos/{owner}/{repo}/statuses/{sha}", {
        owner,
        repo,
        sha,
        state,
        description,
        context: "Ghost Inspector E2E Tests",
        target_url,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
