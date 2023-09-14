const removeImports = require("next-remove-imports");

module.exports = removeImports()({
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  
  // ✅  options...
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  }
});
