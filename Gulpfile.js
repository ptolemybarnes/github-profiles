var gulp                 = require('gulp');
var gulpProtractor       = require("gulp-protractor");
var protractor           = gulpProtractor.protractor;
var ecstatic             = require('ecstatic');
var http                 = require('http');
var enableDestroy        = require('server-destroy');

var server;
gulp.task('server', function(){
  var port = 8080;
  server = http.createServer(
    ecstatic({ root: '.' })
  ).listen(port);
  enableDestroy(server);

  console.log('Server live on ' + port);
});

gulp.task('e2e', ['server'], function(cb) {
  gulp.src(["./test/e2e/*.js"])
      .pipe(protractor({
          configFile: "test/e2e/conf.js",
          args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', function(e) { throw e })
      .on('close', function() { server.destroy() })
});


