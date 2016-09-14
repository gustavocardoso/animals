var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    path = require('path'),
    size = require('gulp-size');

var path = {
  sass: 'assets/sass',
  css: 'assets/css',
  js: 'assets/js'
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var cleancssOptions = {
  keepSpecialComments: 1,
  debug: true
}

gulp.task('sass', function() {
  return gulp.src(path.sass + '/app.scss')
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(size({ gzip: true, showFiles: true }))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(gulp.dest(path.css))
  .pipe(cleancss(cleancssOptions))
  .pipe(size({ gzip: true, showFiles: true }))
  .pipe(gulp.dest(path.css))
  .pipe(notify({message: 'SASS task complete!'}));
});

gulp.task('sass-map', function() {
  return gulp.src(path.sass + '/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.css))
  .pipe(sourcemaps.init())
  .pipe(cleancss(cleancssOptions, function(details) {
      gutil.log('');
      gutil.log(gutil.colors.yellow('Tempo de otimização: ') + gutil.colors.red.bold(details.stats.timeSpent + 'ms'));
      gutil.log(gutil.colors.yellow('Arquivo original: ') + gutil.colors.red.bold(Math.round(details.stats.originalSize / 1024) + 'kb'));
      gutil.log(gutil.colors.yellow('Arquivo minificado: ') + gutil.colors.red.bold(Math.round(details.stats.minifiedSize / 1024) + 'kb'));
      gutil.log(gutil.colors.yellow('Eficiência: ') + gutil.colors.red.bold(Math.round(details.stats.efficiency * 10000) / 100.0 + '%'));
      gutil.log('');
   }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.css))
  .pipe(notify({message: 'Styles task complete!'}));
});

gulp.task('scripts', function() {
  return gulp.src(path.js + '/src/app.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(concat('application.js'))
  .pipe(gulp.dest(path.js))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest(path.js))
  .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('scripts-map', function() {
  return gulp.src(path.js + '/src/app.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(sourcemaps.init())
  .pipe(concat('application.js'))
  .pipe(gulp.dest(path.js))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.js))
  .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('scripts-hint', ['scripts'], function() {
  return gulp.src(path.js + '/app.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(notify({ message: 'Script hint task complete' }));
});

gulp.task('default', function() {
  gulp.start(['styles', 'scripts', 'scripts-hint']);
});

gulp.task('styles', function() {
  gulp.start(['sass']);
});

gulp.task('watch', function() {
  gulp.watch(path.sass + '/**/*.scss', ['sass']);
  gulp.watch(path.js + '/src/*.js', ['scripts', 'scripts-hint']);
});