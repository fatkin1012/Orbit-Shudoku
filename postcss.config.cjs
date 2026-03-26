const prefixer = require("postcss-prefix-selector");

module.exports = {
  plugins: [
    prefixer({
      prefix: "#plugin-plugin-sudoku",
      transform(prefix, selector, prefixedSelector) {
        if (selector.startsWith("@") || selector.includes("keyframes")) {
          return selector;
        }

        if (selector === "html" || selector === "body" || selector === ":root") {
          return prefix;
        }

        return prefixedSelector;
      }
    })
  ]
};