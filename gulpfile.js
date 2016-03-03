var gulp = require('gulp');

var PATHS = {
    src: 'src/**/*.ts'
};

//copy html/css/js files
gulp.task('copy:src', function() {
  return gulp.src([
      'src/assets',
      'system.config.js',
      'src/index.html',
      'src/*.html',
      'src/*.css'
    ])
    .pipe(gulp.dest('dist'))
    // .pipe(connect.reload());
});

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('play', ['ts2js', 'copy:src'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src, ['ts2js']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['play']);
