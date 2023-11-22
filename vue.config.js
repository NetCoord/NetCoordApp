module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "NetCoord";
      return args;
    });
  },
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: "js/[name].netcoord.js",
      chunkFilename: "js/[name].netcoord.js",
    },
  },
};
