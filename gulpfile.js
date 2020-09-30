const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');
const ghpages = require('gh-pages');
sass.compiler = require('node-sass');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(rm());
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src('src/img/icons/sprite.svg')
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('img', () => {
  return src('src/img/**/*')
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({ stream: true }));
});

task('video', () => {
  return src('src/video/beats.mp4')
    .pipe(dest(`${DIST_PATH}/video`))
    .pipe(reload({ stream: true }));
});

task('styles', () => {
  return src([...STYLE_LIBS, 'src/styles/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

const libs = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bxslider/dist/jquery.bxslider.js',
  'node_modules/jquery-touchswipe/jquery.touchSwipe.js',
  'node_modules/mobile-detect/mobile-detect.js',
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
  'src/scripts/*js'
];


task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', { newLine: ";" }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

// task('icons', () => {
//   return src('src/img/icons/*.svg')
//     .pipe(svgo({
//       plugins: [
//         {
//           removeAttrs: {
//             attrs: '(fill|stroke|style|width|height|data.*)'
//           }
//         }
//       ]
//     }))
//     .pipe(svgSprite({
//       mode: {
//         symbol: {
//           sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest('dist/img/icons'));
// });

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});

watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/scripts/*.js', series('scripts'));
watch('./src/img/icons/sprite.svg', series('icons'));
watch('./src/img/*', series('img'));

task('default', series('clean', parallel('copy:html', 'styles', 'scripts', 'icons', 'img', 'video'), 'server'));

