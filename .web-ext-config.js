module.exports = {
  // Global options:
  verbose: false,
  // Command options:
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [
    '.git',
    '.gitignore',
    'node_modules',
    'package.json',
    'package-lock.json',
    'web-ext-artifacts',
    '*.md',
    '.web-ext-config.js',
    'PUBLISHING.md',
    'README.md'
  ],
  run: {
    startUrl: ['about:debugging#/runtime/this-firefox'],
  },
};
