const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const fileinclude = require("gulp-file-include");
const del = require("del");
const terser = require("gulp-terser");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// HTML

const html = () => {
  return gulp
    .src("src/*.html")
    .pipe(fileinclude())
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
};

// Images

const copyImages = () => {
  return gulp
    .src("src/files/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/files/img"));
};

exports.images = copyImages;

// Copy

const copy = (done) => {
  gulp
    .src(["src/files/fonts/*.*"], {
      base: "src",
    })
    .pipe(gulp.dest("build/"));
  done();
};

// Scripts

const scripts = () => {
  return gulp
    .src("src/files/scripts/scripts.js")
    .pipe(gulp.dest("build/files/scripts"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

// Clean

const clean = () => {
  return del("build");
};

// Reload

const reload = (done) => {
  sync.reload();
  done();
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    browser: "firefox",
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

//  Watcher

const watcher = () => {
  gulp.watch("src/scss/**/*.scss", gulp.series(styles));
  gulp.watch("src/files/scripts/scripts.js", gulp.series(scripts));
  gulp.watch("src/*.html", gulp.series(html, reload));
  gulp.watch("src/html/*.html", gulp.series(html, reload));
};

// Build

const build = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(html, styles, scripts)
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  gulp.parallel(html, styles, copyImages, scripts),
  server,
  watcher
);
