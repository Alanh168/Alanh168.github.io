var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpIf('js/*.js', uglify()))
    .pipe(gulpIf('css/*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('img'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['**/*', 'images', 'images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
})