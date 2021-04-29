# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2020-04-29
### Fixed
- Updated dependencies [#7](https://github.com/ghost-inspector/netlify-plugin/pull/7)
- Improved error logging [#8](https://github.com/ghost-inspector/netlify-plugin/pull/8)

## [1.0.0] - 2020-04-23
### Added
- Initial release - adds the ability to trigger Ghost Inspector tests automatically from Netlify builds against the dynamic deploy preview URL. Will also (optionally) update git commit statuses with the results (pass/fail).