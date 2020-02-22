// npx semantic-release --no-ci --branch=mono-repo-scripts --extends=./apps/${appName}/release.config.js --debug

let appName = 'ng-app';

module.exports = {
  name: appName,
  pkgRoot: `dist/apps/${appName}`, // should come from angular.cli
  tagFormat: appName + '-v${version}',
  commitPaths: [`apps/${appName}/*`, 'libs/ng/lib*', 'libs/shared-utils/*'], // this should come from dep-graph results and angular.json
  plugins: [
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `apps/${appName}/CHANGELOG.md`
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: [`apps/${appName}/README.md`, `apps/${appName}/CHANGELOG.md`],
        message:
          'chore(release): ' +
          appName +
          '-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    [
      ('@semantic-release/github',
      {
        assets: `dist/apps/${appName}`,
        successComment:
          ':tada: This issue has been resolved in version ' +
          appName +
          '-v${nextRelease.version} :tada:\n\nThe release is available on [GitHub release](<github_release_url>)'
      })
    ]
  ]
};
