const removeImports = require("next-remove-imports");
const h = `
__       __  __                             ______             __       __            __       __  __                  __ 
|  \  _  |  \|  \                           /      \           |  \     /  \          |  \     /  \|  \                |  \
| $$ / \ | $$| $$____   __    __   _______ |  $$$$$$\ _______  | $$\   /  $$ __    __ | $$\   /  $$ \$$ _______    ____| $$
| $$/  $\| $$| $$    \ |  \  |  \ /       \| $$  | $$|       \ | $$$\ /  $$$|  \  |  \| $$$\ /  $$$|  \|       \  /      $$
| $$  $$$\ $$| $$$$$$$\| $$  | $$|  $$$$$$$| $$  | $$| $$$$$$$\| $$$$\  $$$$| $$  | $$| $$$$\  $$$$| $$| $$$$$$$\|  $$$$$$$
| $$ $$\$$\$$| $$  | $$| $$  | $$ \$$    \ | $$  | $$| $$  | $$| $$\$$ $$ $$| $$  | $$| $$\$$ $$ $$| $$| $$  | $$| $$  | $$
| $$$$  \$$$$| $$  | $$| $$__/ $$ _\$$$$$$\| $$__/ $$| $$  | $$| $$ \$$$| $$| $$__/ $$| $$ \$$$| $$| $$| $$  | $$| $$__| $$
| $$$    \$$$| $$  | $$ \$$    $$|       $$ \$$    $$| $$  | $$| $$  \$ | $$ \$$    $$| $$  \$ | $$| $$| $$  | $$ \$$    $$
 \$$      \$$ \$$   \$$ _\$$$$$$$ \$$$$$$$   \$$$$$$  \$$   \$$ \$$      \$$ _\$$$$$$$ \$$      \$$ \$$ \$$   \$$  \$$$$$$$
                       |  \__| $$                                           |  \__| $$                                     
                        \$$    $$                                            \$$    $$                                     
                         \$$$$$$                                              \$$$$$$                                      
`
console.log(h)

module.exports = removeImports()({
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  env:{
    backendUrl:process.env.BACKEND_URL,
    resenderApiKey:process.env.RESENDER_API_KEY,
    resenderMailId:process.env.RESENDER_MAILID

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
