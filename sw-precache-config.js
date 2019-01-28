module.exports = {
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  stripPrefix: 'build/',
  swFilePath: 'build/service-worker.js'
};