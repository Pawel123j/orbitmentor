module.exports = function (api) {
  api.cache(true);

  return {
    // Expo's preset configures the Worklets transform for Reanimated 4.
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]]
  };
};
