This plugin will trigger a Ghost Inspector test suite against your Netlify deploy preview URL for every build started by a PR. To make this work, you will need to add a few environment variables in Netlify:
- `GHOST_INSPECTOR_API_KEY` - Ghost Inspector API Key, which can be found in your [account settings](https://app.ghostinspector.com/account)
- `GHOST_INSPECTOR_SUITE` - Ghost Inspector suite ID. To find your suite ID, navigate to the suite you want to use and copy the ID in the URL (after /suites/).
- `GITHUB_API_TOKEN` (**optional**) - GitHub Personal Access Token - only required if you want commit status updates on your PR. Without this, the plugin will still function normally, but you will have to access the Netlify build UI in order to see if your Ghost Inspector suite passed or failed.

Add the environment variables and their values to the Netlify Dashboard via: Site Settings > Build & deploy > Environment.

---

Thanks to [Jacob Arriola](https://jacobarriola.com/post/netlify-build-plugin-ghost-inspector) for the initial code and inspiration to make this plugin work.