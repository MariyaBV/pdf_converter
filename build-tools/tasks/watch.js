const { watch, parallel, series } = require("gulp");

module.exports = function watching() {
  watch("src/**/*.html", parallel("html"));
  watch("src/**/*.scss", parallel("style"));
  watch("src/scss/other/**/*.scss", parallel("style_other"));
  watch("src/**/*.js", parallel("dev_js"));
};
