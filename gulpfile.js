
var gulp = require('gulp-param')(require('gulp'), process.argv);
var del = require('del')
var minifyHtml = require("gulp-minify-html");
var minifyCss = require("gulp-clean-css");
var minifyJs = require("gulp-minify");
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var i18n = require('gulp-html-i18n');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var fileInclude = require('gulp-file-include');
var cachebust = require('gulp-cache-bust');
var changedInPlace = require('gulp-changed-in-place');
var gulpif = require('gulp-if');
var nop = require('gulp-nop');
var runSequence = require('run-sequence');
var reload = browserSync.reload;


var localization="en";

gulp.task('locale-check', function(lang) {
   if (lang === undefined) {
      localization = "en"
   } else {
      localization = lang;
   }
   return gulp.src('.').pipe(nop());
});

gulp.task('clean', function() {
  del(['build/*'])
});

gulp.task("build-vendor", function() {
   console.log(localization);
   return gulp.src("src/vendor/*/**")
      .pipe(changedInPlace( { firstPass: true }))
      .pipe(gulp.dest("build/" + localization + "/vendor"));
});

gulp.task("build-css", function() {
   return gulp.src("src/css/*.css")
      .pipe(changedInPlace( { firstPass: true }))
      .pipe(gulp.dest("build/" + localization + "/css"));
});

gulp.task("build-js", function() {
   return gulp.src("src/js/*.js")
      .pipe(changedInPlace( { firstPass: true }))
      .pipe(gulp.dest("build/" + localization + "/js"));
});

gulp.task("build-img", function() {
   return gulp.src("src/img/*")
      .pipe(changedInPlace( { firstPass: true }))
      .pipe(cache(imagemin({ progressive: true, interlaced: true })))
      .pipe(gulp.dest("build/" + localization + "/img"));
});

gulp.task("build-html", function() {
   return gulp.src(['src/*.html'])
      .pipe(fileInclude({ prefix: '@@', baseDir: '/partials'}))
      .pipe(i18n({
         langDir: './locale',
         fallback: 'en',
         createLangDirs: false,
         inline: localization
      }))
      .pipe(changedInPlace( { firstPass: true }))
      .pipe(minifyHtml())
      .pipe(cachebust({ type: 'timestamp' }))
      .pipe(gulp.dest('build/' + localization));
});

gulp.task('build-docs', function() {
   return gulp.src("docs/*/**")
         .pipe(changedInPlace( { firstPass: true }))
         .pipe(minifyJs())
         .pipe(gulp.dest("build/" + localization));
});

gulp.task('watch-html', ['build-html'], function(done) {
   browserSync.reload();
   done();
});

gulp.task('watch-css', ['build-css'], function(done) {
   browserSync.reload();
   done();
});

gulp.task('watch-js', ['build-js'], function(done) {
   browserSync.reload();
   done();
});

gulp.task('watch-img', ['build-img'], function(done) {
   browserSync.reload();
   done();
});


gulp.task('build', function(lang) {
   if (lang === undefined) {
      localization = "en"
   } else {
      localization = lang;
   }
   runSequence('build-html', 'build-css', 'build-js', 'build-img', 'build-vendor', 'build-docs');
})


gulp.task('sync', ['locale-check', 'build-html', 'build-css', 'build-js', 'build-img', 'build-vendor', 'build-docs'], function() {
   var enBrowser = browserSync.create();

   enBrowser.init({
      server: {
         baseDir: "build/" + localization
      }
   });

   gulp.watch("locale/*/**", ["watch-html", enBrowser.reload]);
   gulp.watch("src/*.html", ["watch-html", enBrowser.reload]);
   gulp.watch("src/partials/*.html", ["watch-html"]);
   gulp.watch("src/css/*.css", ["watch-css", enBrowser.reload]);
   gulp.watch("src/js/*.js", ["watch-js", enBrowser.reload]);
   gulp.watch("src/img/*", ["watch-img", enBrowser.reload]);
});


gulp.task('default', ['sync']);
