var gulp = require('gulp');
var del = require('del')
var minifyHtml = require("gulp-minify-html");
var minifyCss = require("gulp-clean-css");
var minifyJs = require("gulp-minify");
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var i18n = require('gulp-html-i18n');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var reload      = browserSync.reload;


var buildDirs = [
   'build/en/',
   'build/zh/',
   'build/pseudo/'
];

gulp.task('clean', function() {
  del(['build/*'])
});

gulp.task("build-css", function() {
   var pipeline = gulp.src("src/styles/*.css");

   buildDirs.forEach(function(d) {
      pipeline = pipeline.pipe(minifyCss()).pipe(gulp.dest(d + "/styles/"));
   });

   return pipeline;
});

gulp.task("build-js", function() {
   var pipeline = gulp.src("src/js/*.js");

   buildDirs.forEach(function(d) {
      pipeline = pipeline.pipe(minifyJs()).pipe(gulp.dest(d + "/js/"));
   });

   return pipeline;
});

gulp.task("build-img", function() {
   var pipeline = gulp.src("src/img/*");

   buildDirs.forEach(function(d) {
      pipeline = pipeline.pipe(imagemin({ progressive: true, interlaced: true })).pipe(gulp.dest(d + "/img/"));
   });
});

gulp.task('build-html', function() {
   gulp.src("src/*.html")
      .pipe(minifyHtml())
      .pipe(gulp.dest('build/'));
});

gulp.task("translate", function() {
   return gulp.src(['src/*.html'])
   .pipe(i18n({
      langDir: './locale',
      fallback: 'en',
      createLangDirs: true
   }))
   .pipe(minifyHtml())
   .pipe(gulp.dest('build/'));
});

gulp.task('watch-html', ['translate'], function(done) {
   browserSync.reload();
   done();
});

gulp.task('watch-css', ['build-css'], function(done) {
   browserSync.reload();
   done();
});

gulp.task('watch-js', ['build-js'], function(done) {
   browserSync.realod();
   done();
});

gulp.task('watch-img', ['build-img'], function(done) {
   browserSync.reload();
   done();
});


gulp.task('sync-en', ['translate', 'build-css', 'build-js', 'build-img'], function() {
   browserSync.init({
      server: {
         baseDir: "build/en"
      }
   });

   gulp.watch("locale/*/**", ["watch-html"]);
   gulp.watch("src/*.html", ["watch-html"]);
   gulp.watch("src/styles/*.css", ["watch-css"]);
   gulp.watch("src/js/*.js", ["watch-js"]);
   gulp.watch("src/img/*", ["watch-img"]);
});


gulp.task('sync-zh', ['translate', 'build-css', 'build-js', 'build-img'], function() {
   browserSync.init({
      server: {
         baseDir: "build/zh"
      }
   });

   gulp.watch("locale/*/**", ["watch-html"]);
   gulp.watch("src/*.html", ["watch-html"]);
   gulp.watch("src/styles/*.css", ["watch-css"]);
   gulp.watch("src/js/*.js", ["watch-js"]);
   gulp.watch("src/img/*", ["watch-img"]);
});

gulp.task('sync-pseudo', ['translate', 'build-css', 'build-js', 'build-img'], function() {
   browserSync.init({
      server: {
         baseDir: "build/pseudo"
      }
   });

   gulp.watch("locale/*/**", ["watch-html"]);
   gulp.watch("src/*.html", ["watch-html"]);
   gulp.watch("src/styles/*.css", ["watch-css"]);
   gulp.watch("src/js/*.js", ["watch-js"]);
   gulp.watch("src/img/*", ["watch-img"]);
});

gulp.task('default', ['sync-en']);