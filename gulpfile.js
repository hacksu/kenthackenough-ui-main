/**
* This file is the build system for this app. There are several arrays where
* dependencies are defined, so if you need to add more dependencies, please
* read the comments carefully before modifying them.
*/

/**
* An array of all javascript libraries to build.
* You should only have to change this if you add new folders
* to scripts/
*/
var scripts = [

  './config/config.js',
  './scripts/**/*.js'

];

/**
* All bower javascript files. Add to this list to install more dependencies
*/
var bowerJs = [

  './bower_components/socket.io-client/socket.io.js',
  './bower_components/modernizr/modernizr.js',
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/fastclick/lib/fastclick.js',
  './bower_components/angular/angular.min.js',
  './bower_components/angular-ui-router/release/angular-ui-router.min.js',
  './bower_components/angular-animate/angular-animate.min.js',
  './bower_components/angular-socket-io/socket.min.js',
  './bower_components/angular-cookies/angular-cookies.min.js',
  './bower_components/moment/min/moment.min.js',
  './bower_components/moment-timezone/builds/moment-timezone-with-data.min.js',
  './bower_components/angular-moment/angular-moment.min.js',
  './bower_components/marked/marked.min.js',
  './bower_components/snap.svg/dist/snap.svg-min.js',
  './bower_components/wow.js/dist/wow.min.js',
  './bower_components/dropzone/dist/min/dropzone.min.js',
  './bower_components/notify.js/notify.js',
  './bower_components/instafeed.js/instafeed.min.js'

];

/**
* Bower CSS files. Add to this list to install more dependencies
*/
var bowerCss = [

  './bower_components/foundation/css/foundation.css',
  './bower_components/font-awesome/css/font-awesome.css',
  './bower_components/animate.css/animate.min.css',
  './bower_components/dropzone/dist/min/dropzone.min.css'

];

/**
********************************************************************************
* Define Gulp tasks                                                            *
********************************************************************************
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var _ = require('underscore');

/**
* Build bower javascript files
*/
gulp.task('build-bower-js', function () {
  return gulp.src(bowerJs)
    .pipe(concat('bower.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

/**
* Lint the scripts/ directory
*/
gulp.task('lint', function () {
  return gulp.src(scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/**
* Build programmer-defined javascript files
*/
gulp.task('build-scripts', function () {
  return gulp.src(scripts)
    .pipe(plumber())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

/**
* Build bower css files
*/
gulp.task('build-bower-css', function () {
  return gulp.src(bowerCss)
    .pipe(concat('bower.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/styles/'));
});

/**
* Build programmer-defined css files
*/
gulp.task('build-sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(concat('styles.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/styles/'));
});

/**
* Move over font-awesome icons so they're next to the fonts directory
*/
gulp.task('font-awesome-icons', function() { 
  return gulp.src('./bower_components/font-awesome/fonts/*') 
    .pipe(gulp.dest('./dist/fonts/')); 
});

/**
* Gulp watch task, run this while you develop
*/
gulp.task('watch', ['build'], function () {
  gulp.watch(_.union(bowerJs, bowerCss),
    [
      'build-bower-js',
      'build-bower-css',
      'font-awesome-icons'
    ]
  ).on('change', function (event) {
    var parts = event.path.split('/');
    var filename = parts[parts.length - 1];
    console.log(filename + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch(scripts,
    [
      'lint',
      'build-scripts'
    ]
  ).on('change', function (event) {
    var parts = event.path.split('/');
    var filename = parts[parts.length - 1];
    console.log(filename + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch('./sass/**/*',
    [
      'build-sass'
    ]
  ).on('change', function (event) {
    var parts = event.path.split('/');
    var filename = parts[parts.length - 1];
    console.log(filename + ' was ' + event.type + ', running tasks...');
  });

});

/**
* Build the entire app
*/
gulp.task('build',
  [
    'build-bower-js',
    'lint',
    'build-scripts',
    'build-bower-css',
    'font-awesome-icons',
    'build-sass'
  ], function () {

  });

/**
* Default task is just a help page
*/
gulp.task('default', function () {
  console.log(' ');
  console.log('- Help -------------------------------------------------------');
  console.log('|                                                            |');
  console.log('| gulp build            Lint, concatenate, and minify the    |');
  console.log('|                       entire application.                  |');
  console.log('|                                                            |');
  console.log('| gulp watch            Watches for your changes, and keeps  |');
  console.log('|                       the app built. Run this while you    |');
  console.log('|                       develop, and check the console for   |');
  console.log('|                       linting errors.                      |');
  console.log('|                                                            |');
  console.log('| gulp --tasks          Display all available tasks.         |');
  console.log('|                                                            |');
  console.log('--------------------------------------------------------------');
  console.log(' ');
});