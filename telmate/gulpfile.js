var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
 
var dependencies = [
  'react',
  'react-dom'
];

var scriptsCount = 0;
 
gulp.task('scripts', function () {
    bundleApp(false);
});
 
gulp.task('watch', function () {
  gulp.watch(['./public/scripts/*.js'], ['scripts']);
});
 
gulp.task('default', ['scripts','watch']);
 
function bundleApp(isProduction) {
  scriptsCount++;
  var appBundler = browserify({
      entries: './public/scripts/main.js',
      debug: true
    })
 
    if (!isProduction && scriptsCount === 1){
      browserify({
      require: dependencies,
      debug: true
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest('./web/js/'));
    }
    if (!isProduction){
      dependencies.forEach(function(dep){
        appBundler.external(dep);
      })
    }
 
    appBundler
      .transform("babelify", {presets: ["react"]})
      .bundle()
      .on('error',gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/build/'));
}
