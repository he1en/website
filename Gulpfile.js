var gulp = require('gulp')
var browserify = require('gulp-browserify')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var clean = require('gulp-clean')
var react = require('gulp-react')
var sass = require('gulp-sass')

gulp.task('clean', function () {
  return gulp.src(['build/*'], {read: false}).pipe(clean())
})

// Parse and compress JS and JSX files
gulp.task('javascript-components', function () {
  return gulp.src('client/components/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('build/components/'))
})
gulp.task('javascript-routes', function () {
  return gulp.src('routes.jsx')
    .pipe(react())
    .pipe(gulp.dest('build/'))
})

// Browserify the source tree into a client-side library
function browserifyTask () {
  return gulp.src('main.js')
    .pipe(browserify(
      { transform: [ 'reactify' ] }
    ))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('public/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/'))
}

// Compile sass to css
gulp.task('build-css', function () {
  return gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
})

gulp.task('browserify',
          ['javascript-components', 'javascript-routes'],
          browserifyTask)

gulp.task('build', ['clean'], function () {
  return gulp.start('browserify')
})

gulp.task('default', ['build', 'build-css'])
