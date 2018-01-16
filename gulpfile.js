const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const gutil = require('gulp-util')
const path = require('path')
const size = require('gulp-size')
const webpackStream = require('webpack-stream')
const eslint = require('gulp-eslint')

const paths = {
  sass: './src/sass',
  css: './public/stylesheets',
  jsSrc: './src/js',
  js: './public/javascripts'
}

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

const cleancssOptions = {
  keepSpecialComments: 1,
  debug: true
}

gulp.task('sass', () => {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest(paths.css))
    .pipe(cleancss(cleancssOptions, function (details) {
      gutil.log('')
      gutil.log(gutil.colors.yellow('Tempo de otimização: ') + gutil.colors.red.bold(details.stats.timeSpent + 'ms'))
      gutil.log(gutil.colors.yellow('Arquivo original: ') + gutil.colors.red.bold(Math.round(details.stats.originalSize / 1024) + 'kb'))
      gutil.log(gutil.colors.yellow('Arquivo minificado: ') + gutil.colors.red.bold(Math.round(details.stats.minifiedSize / 1024) + 'kb'))
      gutil.log(gutil.colors.yellow('Eficiência: ') + gutil.colors.red.bold(Math.round(details.stats.efficiency * 10000) / 100.0 + '%'))
      gutil.log('')
    }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(paths.css))
    .pipe(notify({message: 'SASS task complete!'}))
})

gulp.task('sass-map', () => {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css))
    .pipe(sourcemaps.init())
    .pipe(cleancss(cleancssOptions, function (details) {
      gutil.log('')
      gutil.log(gutil.colors.yellow('Tempo de otimização: ') + gutil.colors.red.bold(details.stats.timeSpent + 'ms'))
      gutil.log(gutil.colors.yellow('Arquivo original: ') + gutil.colors.red.bold(Math.round(details.stats.originalSize / 1024) + 'kb'))
      gutil.log(gutil.colors.yellow('Arquivo minificado: ') + gutil.colors.red.bold(Math.round(details.stats.minifiedSize / 1024) + 'kb'))
      gutil.log(gutil.colors.yellow('Eficiência: ') + gutil.colors.red.bold(Math.round(details.stats.efficiency * 10000) / 100.0 + '%'))
      gutil.log('')
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css))
    .pipe(notify({message: 'Styles task complete!'}))
})

gulp.task('scripts', ['eslint'], () => {
  const debug = process.env.NODE_ENV !== 'production'

  return gulp.src(paths.jsSrc + '/app-src.js')
    .pipe(webpackStream({
      context: __dirname,
      devtool: debug ? 'inline-sourcemap' : null,
      output: {
        filename: 'bundle.min.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            include: [
              path.resolve(__dirname, 'src')
            ],
            loader: 'babel-loader',
            query: {
              presets: [
                ['env', {
                  'targets': {
                    'browsers': ['last 2 versions', 'safari >= 7']
                  },
                  'modules': false
                }]
              ]
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(paths.js))
    .pipe(notify({ message: 'JS bundle completed' }))
})

gulp.task('eslint', () => {
  return gulp.src(paths.jsSrc + '/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('default', () => {
  gulp.start(['styles', 'scripts'])
})

gulp.task('styles', () => {
  gulp.start(['sass'])
})

gulp.task('watch', () => {
  gulp.watch(paths.sass + '/**/*.scss', ['sass'])
  gulp.watch(paths.jsSrc + '/**/*.js', ['scripts'])
})
