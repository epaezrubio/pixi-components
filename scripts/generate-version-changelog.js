const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const package = require('../package.json');

const git = simpleGit();
const lastVersion =  `v${package.version}`;

git.log({
  to: 'HEAD',
  from: lastVersion,
}).then((log) => {
  const versionChangelogPath = path.join(__dirname, '../CHANGELOG_VERSION.md');
  const output = log.all.map(({ hash, message }) => {
    return `- ${message} (${hash})`
  }).join('\n');

  fs.writeFileSync(versionChangelogPath, output);
});
