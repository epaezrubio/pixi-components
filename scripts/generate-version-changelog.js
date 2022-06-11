const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const package = require('../package.json');

function getCommitChangelog(commits) {
  return commits.map(({ message, hash }) => {
    return `- ${message} (${hash})`;
  });
}

const git = simpleGit();
const lastVersion =  `v${package.version}`;

git.log({
  to: 'HEAD',
  from: lastVersion,
}).then((log) => {
  const versionChangelogPath = path.join(__dirname, '../CHANGELOG_VERSION.md');

  const versionGroups = {
    added: [],
    removed: [],
    changed: [],
    fixed: [],
    chore: [],
    other: [],
  }

  for (const commit of log.all) {
    if (commit.message.startsWith('Add')) {
      versionGroups.added.push(commit);
    } else if (commit.message.startsWith('Remove') || commit.message.startsWith('Delete')) {
      versionGroups.removed.push(commit);
    } else if (commit.message.startsWith('Change') || commit.message.startsWith('Replace')) {
      versionGroups.changed.push(commit);
    } else if (commit.message.startsWith('Fix')) {
      versionGroups.fixed.push(commit);
    } else if (commit.message.startsWith('Refactor')) {
      versionGroups.chore.push(commit);
    } else {
      versionGroups.other.push(commit);
    }
  }

  const output = [];

  if (versionGroups.added.length > 0) {
    output.push('### Added', ...getCommitChangelog(versionGroups.added), '');
  }

  if (versionGroups.removed.length > 0) {
    output.push('### Removed', ...getCommitChangelog(versionGroups.removed), '');
  }

  if (versionGroups.removed.length > 0) {
    output.push('### Changed', ...getCommitChangelog(versionGroups.changed), '');
  }

  if (versionGroups.fixed.length > 0) {
    output.push('### Fixed', ...getCommitChangelog(versionGroups.fixed), '');
  }

  if (versionGroups.chore.length > 0) {
    output.push('### Chore', ...getCommitChangelog(versionGroups.chore), '');
  }

  output.push(...getCommitChangelog(versionGroups.other));

  // trim last line if empty
  if (output.at(-1) === '') {
    output.splice(output.length - 1, 1);
  }

  fs.writeFileSync(versionChangelogPath, output.join('\n'));
});