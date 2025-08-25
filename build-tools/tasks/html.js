const { src, dest } = require("gulp");
const include = require("gulp-file-include");
const bs = require("browser-sync");

module.exports = function html() {
  return src(["src/**/*.html", "!src/components/**/*.html"])
    .pipe(include())
    .pipe(dest("../pdf_converter/"))
    .pipe(bs.stream());
};
