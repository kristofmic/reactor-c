const path = require('path');

const envs = [
  'dev',
  'staging',
  'production'
];

envs.forEach((env) => {
  try {
    require(path.join(__dirname, '..', 'env', `${env}.json`));
  } catch (e) {
    console.log(`Invalid JSON for ${env} environment: `, e);
    process.exit(1);
  }
});

process.exit(0);
