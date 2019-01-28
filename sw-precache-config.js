module.exports = {
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  staticFileGlobs: [
    'docs/*.html',
    'docs/manifest.json',
    'docs/static/**/!(*map*)'
  ],
  stripPrefix: 'docs/',
  swFilePath: 'docs/service-worker.js'
};