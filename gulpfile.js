var gulp = require('gulp')
var del = require('del')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngHtml2Js = require("gulp-ng-html2js")
var minifyHtml = require("gulp-minify-html")
var css2js = require("gulp-css2js")
var sass = require("gulp-sass")
var autoprefixer = require("gulp-autoprefixer")
var eslint = require("gulp-eslint")
var util = require("gulp-util")
var runSequence = require('run-sequence');
var ngAnnotate = require('gulp-ng-annotate')
var babel = require('gulp-babel')

// global error handler
var errorHandler = function (error) {
  if (build) {
    throw error
  } else {
    beep(2, 170);
    util.log(error)
  }
}

gulp.task('html2js', function () {
  return gulp.src(['./src/*.html'])
    .pipe(minifyHtml())
    .pipe(ngHtml2Js({
      moduleName: "templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./dist/tmp/"))
})

gulp.task('css2js', function () {
  return gulp.src("./src/*.scss")
    .pipe(sass())
    .pipe(autoprefixer('last 1 Chrome version', 'last 3 iOS versions', 'last 3 Android versions'))
    .pipe(css2js())
    .pipe(concat("css.js"))
    .pipe(gulp.dest("./dist/tmp/"))
})

gulp.task('eslint', () => {
  return gulp
    .src('src/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', errorHandler)
  done()
})

gulp.task('babel', () => {
  return gulp.src('src/*.js')
    .pipe(babel({presets: ['es2015'], compact: false}))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist/tmp/'))
})

gulp.task('make-bundle', function () {
  return gulp.src(['dist/tmp/*'])
    .pipe(concat('angularValidateWithToast.bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
})

gulp.task('make-bundle-dev', function () {
  return gulp.src(['dist/tmp/*'])
    .pipe(concat('angularValidateWithToast.bundle.js'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('del', function () {
  del(['dist/*'])
})

gulp.task('del-temp-files', ['make-bundle', 'make-bundle-dev'], function () {
  del('dist/tmp/');
});

gulp.task('test', function() {
  gulp.src('src/angularModulesTest.js')
  .pipe(uglify())
})

gulp.task('default', ['del'], () => {
  runSequence(
    'eslint',
    'babel',
    'html2js',
    'css2js',
    'make-bundle-dev',
    'make-bundle',
    'del-temp-files'
  )
})
