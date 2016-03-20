var gulp         = require('gulp')
var path         = require('path')
var less         = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps   = require('gulp-sourcemaps')
var minifyCSS    = require('gulp-minify-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var connect      = require('gulp-connect')
var open         = require('gulp-open')

var Paths = {
  HERE                 : './',
  DIST                 : 'dist',
  DIST_JS      : 'dist/studio.js',
  LESST_SOURCES : './less/studio*',
  LESS                 : './less/**/**',
  JS                   : [
      '../bootstrap/js/transition.js',
      '../bootstrap/js/alert.js',
      '../bootstrap/js/affix.js',
      '../bootstrap/js/button.js',
      '../bootstrap/js/carousel.js',
      '../bootstrap/js/collapse.js',
      '../bootstrap/js/dropdown.js',
      '../bootstrap/js/modal.js',
      '../bootstrap/js/tooltip.js',
      '../bootstrap/js/popover.js',
      '../bootstrap/js/scrollspy.js',
      '../bootstrap/js/tab.js'
    ]
}

gulp.task('default', ['less-min', 'js-min'])

gulp.task('watch', function () {
  gulp.watch(Paths.LESS, ['less-min']);
  gulp.watch(Paths.JS,   ['js-min']);
})

/*
gulp.task('docs', ['server'], function () {
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9001/docs/'}))
})

gulp.task('server', function () {
  connect.server({
    root: 'docs',
    port: 9001,
    livereload: true
  })
})
*/

gulp.task('less', function () {
  return gulp.src(Paths.LESST_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest('dist'))
})

gulp.task('less-min', ['less'], function () {
  return gulp.src(Paths.LESST_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefixer({browsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 8', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6']}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.DIST))
})

gulp.task('js', function () {
  return gulp.src(Paths.JS)
    .pipe(concat('studio.js'))
    .pipe(gulp.dest(Paths.DIST))
})

gulp.task('js-min', ['js'], function () {
  return gulp.src(Paths.DIST_JS)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(Paths.DIST))
})


