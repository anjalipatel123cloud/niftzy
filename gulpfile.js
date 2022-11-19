"use strict";

// All plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
var sass = require('gulp-sass')(require('sass'));
const gulp = require("gulp");
const cssnano = require("cssnano");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
var reload = browsersync.reload;

// SCSS task
gulp.task("scss-compile", () => {
  return gulp
    .src("assets/scss/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("assets/css"))
    .pipe(notify({
      message: "main SCSS processed"
    }))
    .pipe(browsersync.stream())
    .pipe(livereload())
});


// Browser sync
gulp.task("browser-sync", function (done) {
  browsersync.init({
    server: "./",
    startPath: "html/index.html", // After it browser running [File path set]
    //    browser: 'chrome',
    host: 'localhost',
    //    port: 4000,
    open: true,
    tunnel: true
  });
  gulp.watch(["./**/*.html"]).on("change", reload); // [File path set]
  done();
});

gulp.task("default", gulp.series("scss-compile", "browser-sync", () => {
  livereload.listen();
  gulp.watch(["assets/scss/**/*"], gulp.series("scss-compile"));
}));





