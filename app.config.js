const { expo } = require('./app.json');

module.exports = () => {
  if (process.env.APP_VARIANT !== 'storage-test') return expo;
  // Native destructive fixtures have a separate application sandbox. Never
  // clear storage in the user's normal installation to run a regression.
  return {
    ...expo,
    name: 'OrbitMentor Storage Test',
    scheme: 'orbitmentor-storage-test',
    android: { ...expo.android, package: 'com.orbitmentor.app.storagetest' },
    ios: { ...expo.ios, bundleIdentifier: 'com.orbitmentor.app.storagetest' },
  };
};
