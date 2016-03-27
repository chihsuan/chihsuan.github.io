/**
 * Gulp configuration
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jsonminify = require('gulp-jsonminify');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('clean', function(cb) {
  del.sync(['dist'], cb);
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src(['./src/**/*.html', './src/views/**/*.html'])
  .pipe(minifyHTML(opts))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', function() {
  gulp.src(['./src/**/*.js', './src/views/**/*.js'])
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  return gulp.src(['./src/**/*.css', './src/views/**/*.css'])
  .pipe(minifyCSS())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('image', function () {
  return gulp.src(['./src/**/*.jpg', './src/**/*.png'])
  .pipe(imagemin({
    use: [pngquant({quality: '25-50'}), imageminJpegRecompress({min: 60, max: 95})]
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('scss', function() {
  return gulp.src(['./src/scss/style.scss'])
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers:  AUTOPREFIXER_BROWSERS,
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(gulp.dest('./dist/css/'));
});

gulp.task('json', function () {
    return gulp.src(['./src/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', ['minify-html']);
  gulp.watch(['./src/**/*.js'], ['scripts']);
  gulp.watch(['./src/**/*.scss'], ['scss']);
  gulp.watch(['./src/**/*.jpg', './src/**/*.png'], ['image']);
  gulp.watch(['./src/*.json'], ['json']);
});

gulp.task('default', ['clean', 'scripts',  'scss', 'minify-html', 'image', 'json', 'watch']);
