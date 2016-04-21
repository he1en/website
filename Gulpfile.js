var gulp = require('gulp')
var browserify = require('gulp-browserify')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var less = require('gulp-less')
var minifycss = require('gulp-minify-css')
var clean = require('gulp-clean')
var react = require('gulp-react')

gulp.task('clean', function () {
  return gulp.src(['build/*'], {read: false}).pipe(clean())
})

// Parse and compress JS and JSX files
gulp.task('javascript', function () {
  return gulp.src('client/components/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('build/components/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/components/'))
})

// Browserify the source tree into a client-side library
function browserifyTask () {
  return gulp.src('main.js')
    .pipe(browserify())
    .pipe(rename('main.js'))
    .pipe(gulp.dest('public/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/'))
}

gulp.task('browserify', ['javascript'], browserifyTask)
gulp.task('browserify_nodep', browserifyTask)

gulp.task('default', ['clean'], function () {
  return gulp.start('browserify')
})
