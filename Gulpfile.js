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
    size = require('gulp-size'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify');

var path = {
  sass: 'assets/sass',
  css: 'assets/css',
  js: 'assets/js',
  svgSrc: 'assets/images/animals/icons',
  svgDest: 'assets/images/icons'
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
  return browserify({entries: path.js + '/src/application.js', extensions: ['.js'], debug: true})
  .transform(babelify.configure({presets : ["es2015"]}))
  .bundle()
  .pipe(source('application.js'))
  .pipe(gulp.dest(path.js));
});

gulp.task('scripts-map', function() {
  return gulp.src(path.js + '/src/**/*.js')
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
  // return gulp.src(path.js + '/app.js')
  // .pipe(jshint('.jshintrc'))
  // .pipe(jshint.reporter('jshint-stylish'))
  // .pipe(notify({ message: 'Script hint task complete' }));
});

gulp.task('sprite', ['pngSprite']);

gulp.task('default', function() {
  gulp.start(['styles', 'scripts', 'scripts-hint']);
});

gulp.task('styles', function() {
  gulp.start(['sass']);
});

gulp.task('watch', function() {
  gulp.watch(path.sass + '/**/*.scss', ['sass']);
  gulp.watch(path.js + '/src/**/*.js', ['scripts', 'scripts-hint']);
});