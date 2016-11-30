import glob from 'glob';
import path from 'path';

let matchedPatterns = [];
let ignoredPatterns = ['**/*.spec.js'];

if (process.env.TEST_ENV === 'server') {
  const serverPatterns = [
    './controllers/**/*.js',
    './lib/**/*.js'
  ];
  const ignoredServerPatterns = [];

  matchedPatterns = matchedPatterns.concat(serverPatterns);
  ignoredPatterns = ignoredPatterns.concat(ignoredServerPatterns);
} else if (process.env.TEST_ENV === 'client') {
  const clientPatterns = [
    './client/**/*.js'
  ];
  const ignoredClientPatterns = [
    './client/entry.js'
  ];

  matchedPatterns = matchedPatterns.concat(clientPatterns);
  ignoredPatterns = ignoredPatterns.concat(ignoredClientPatterns);
}

matchedPatterns.forEach((pattern) => {
  glob.sync(pattern, {
    dot: true,
    ignore: ignoredPatterns
  })
    .forEach(requireFile);
});

function requireFile(filepath) {
  if (filepath.indexOf('.spec') !== -1) { return; }

  const fullPath = path.join(__dirname, '..', filepath);

  require(fullPath);
}
