// Required Methods
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("/css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("/css"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.watch("/css/*.scss", ['sass']);
gulp.watch("/*.html").on('change', browserSync.reload);

gulp.task('default', ['serve']);
