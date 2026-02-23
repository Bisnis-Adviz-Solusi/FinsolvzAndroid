const path = require("node:path");
const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const dirPath = __dirname;

  console.log("THIS IS METRO CONFIG>>>", {
    cwd: process.cwd(),
    file: __filename,
    dirPath,
  });

  const defaultConfig = await getDefaultConfig(dirPath);

  defaultConfig.transformer = {
    ...defaultConfig.transformer,
    babelTransformerPath: "react-native-svg-transformer",
  };

  defaultConfig.resolver = {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  };

  return defaultConfig;
})();
