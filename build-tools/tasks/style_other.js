const { src, dest } = require("gulp");
const sass = require("gulp-dart-sass");//(require("sass"));
const bulk = require("gulp-sass-bulk-importer");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
//const clean = require("gulp-clean-css");
const concat = require("gulp-concat");
const map = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const bs = require("browser-sync");
module.exports = function style_other() {
  return src("src/scss/other/**/*.scss")
    .pipe(map.init())
    .pipe(bulk())
    .pipe(
      sass({
        //outputStyle: "compressed",
        outputStyle: "expanded", 
        silenceDeprecations: ['legacy-js-api'],
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ["last 8 versions"],
          cascade: false,
        }),
      ])
    )
    // .pipe(
    //   clean({
    //     level: 2,
    //   })
    // )
    .pipe(
      rename(function (path) {
        path.basename;
      })
    )
    //.pipe(map.write("../sourcemaps/"))
    //.pipe(concat("other_style.css"))
    .pipe(dest("../pdf_converter/css/other/"))
    .pipe(bs.stream());
};
