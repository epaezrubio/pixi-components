const fs = require('fs');
const path = require('path');
const semver = require('semver');
const package = require('../package.json');

if (!process.argv[2]) {
  throw new Error('Changelog increment not provided');
}

const increment = process.argv[2].toLowerCase();

if (increment !== 'major' && increment !== 'minor' && increment !== 'patch') {
  throw new Error(`Invalid changelog increment '${increment}'`);
}

const nextVersion = semver.inc(package.version, increment);

const changelogPath = path.join(__dirname, '../CHANGELOG.md');
const versionChangelogPath = path.join(__dirname, '../CHANGELOG_VERSION.md');

const changelog = fs.readFileSync(changelogPath, 'utf8').split('\n');
const version = fs.readFileSync(versionChangelogPath, 'utf8').split('\n');

const previousChanges = changelog.slice(2);

const output = [
  '# Changelog',
  '',
  `## ${nextVersion}`,
  ...version,
  '',
  ...previousChanges
].join('\n');

fs.writeFileSync(changelogPath, output);
