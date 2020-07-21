'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var del = require('del');

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('docs/css'))
    .pipe(server.stream());
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('server', function () {
  server.init({
    server: 'docs/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    browser: 'firefox'
  });
  gulp.watch('source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('source/js/**', gulp.series('js', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('images', function () {
  return gulp.src('docs/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('docs/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/**/*icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('docs/img'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**',
    'source/*.ico',
    'source/*.html'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('docs'));
});

gulp.task('clean', function () {
  return del('docs');
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
  .pipe(gulp.dest('docs'));
});

gulp.task('js', function () {
  return gulp.src('source/js/**')
  .pipe(gulp.dest('docs/js/'));
});

gulp.task('picturefill', function () {
  return gulp.src('./node_modules/picturefill/dist/picturefill.min.js')
    .pipe(gulp.dest('source/js'))
    .pipe(gulp.dest('docs/js'));
});

gulp.task('svg4everybody', function () {
  return gulp.src('./node_modules/svg4everybody/dist/svg4everybody.min.js')
    .pipe(gulp.dest('source/js'))
    .pipe(gulp.dest('docs/js'));
});

gulp.task('docs', gulp.series(
  'clean',
  'copy',
  'css',
  'images',
  'picturefill',
  'svg4everybody',
  'sprite',
  'js',
  'html'
));

gulp.task('start', gulp.series(
  'docs',
  'server'
));
