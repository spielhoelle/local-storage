var gulp   = require('gulp');
var rsync  = require('gulp-rsync');
gulp.task('stage', function () {
  gulp.src('.')
    .pipe(rsync({
      root: '.',
      hostname: 'shaula.uberspace.de',
      destination: '~/html/local-storage',
      username: 'spielhoe',
      recursive: true,
      verbose: true
    }))
})
