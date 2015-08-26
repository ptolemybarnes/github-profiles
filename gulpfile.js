var gulp       = require('gulp');
var protractor = require("gulp-protractor").protractor;

gulp.task('protractor', function(cb) {
  gulp.src(["./test/e2e/*.js"])
      .pipe(protractor({
          configFile: "test/e2e/conf.js",
          args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', function(e) { throw e })
});


