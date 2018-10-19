var plugin = require("../src/index");

require("@babel/register")({
  presets: ["@babel/preset-react"],
  plugins: [plugin],
  cache: false
});

require("./test/basic");
require("./test/if");
require("./test/choose");
require("./test/for");
require("./test/with");
require("./test/mixed");
require("./test/extension");
require("./test/error");
