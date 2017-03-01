var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    path = require('path'),
    size = require('gulp-size'),
    webpack = require('gulp-webpack');

var paths = {
  sass: './src/sass',
  css: './public/stylesheets',
  jsSrc: './src/js',
  js: './public/javascripts',
  svgSrc: './src/images/animals/icons',
  svgDest: './public/images/icons'
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
  return gulp.src(paths.sass + '/app.scss')
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(size({ gzip: true, showFiles: true }))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(gulp.dest(paths.css))
  .pipe(cleancss(cleancssOptions))
  .pipe(size({ gzip: true, showFiles: true }))
  .pipe(gulp.dest(paths.css))
  .pipe(notify({message: 'SASS task complete!'}));
});

gulp.task('sass-map', function() {
  return gulp.src(paths.sass + '/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.css))
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
  .pipe(gulp.dest(paths.css))
  .pipe(notify({message: 'Styles task complete!'}));
});

gulp.task('scripts', function() {
  // return browserify({entries: paths.js + '/src/application.js', extensions: ['.js'], debug: true})
  // .transform(babelify.configure({presets : ["es2015"]}))
  // .bundle()
  // .pipe(source('application.js'))
  // .pipe(gulp.dest(paths.js));
  const debug = process.env.NODE_ENV !== "production";

  return gulp.src(paths.jsSrc + '/app-src.js')
    .pipe(webpack({
      context: __dirname,
      devtool: debug ? "inline-sourcemap" : null,
      output: {
        filename: "bundle.min.js"
      },
      module: {
        loaders: [
          {
            loader: "babel-loader",

            // Skip any files outside of your project's `src` directory
            exclude: /node_modules/,
            include: [
              path.resolve(__dirname, "src"),
            ],

            // Only run `.js` and `.jsx` files through Babel
            test: /\.jsx?$/,

            // Options to configure babel with
            query: {
              presets: ['es2015'],
            }
          },
        ]
      }
    }))
    .pipe(gulp.dest(paths.js))
    .pipe(notify({ message: 'JS bundle completed' }));
});

gulp.task('scripts-map', function() {
  return gulp.src(paths.js + '/src/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(sourcemaps.init())
  .pipe(concat('application.js'))
  .pipe(gulp.dest(paths.js))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.js))
  .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('scripts-hint', ['scripts'], function() {
  // return gulp.src(paths.js + '/app.js')
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
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.jsSrc + '/**/*.js', ['scripts']);
});
