let common = [
    'src/features/**/*.feature',                // Specify feature files
    '--require-module ts-node/register',        // Load TypeScript module
    '--require src/steps/**/*.ts',              // Load step definitions
    '--format progress',                        // Output format
    '--publish-quiet'                           // Disable publishing reports
  ].join(' ');
  module.exports = {
    default: common
  };
    