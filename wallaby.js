module.exports = function() {
  return {
    files: [
      "src/**/*.js",
      "spec/testUtil.js",
      {
        pattern: "spec/**/*.jsx",
        instrument: false,
        load: false,
        ignore: false
      }
    ],

    tests: ["spec/**/*.js", "!spec/tests.js", "!spec/testUtil.js"],

    env: {
      type: "node",
      runner: "node"
    },

    setup: function(wallaby) {
      var plugin = require("./src/index");
      require("@babel/register")({
        presets: ["@babel/preset-react"],
        plugins: [plugin],
        cache: false
      });
    }
  };
};
