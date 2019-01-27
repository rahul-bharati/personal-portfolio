const browserSync = require('browser-sync');
const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

sass.compiler = require('node-sass');

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

const scss = () => {
    return gulp.src(['app/sass/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(minify())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}

const serve = () => {
    browserSync.init({
        server: './app/',
        browser: 'chrome'
    });
    gulp.watch(['app/sass/**/*.scss','app/sass/*.scss'], scss);
    gulp.watch(['app/*.html']).on('change', browserSync.reload);
}

exports.scss = scss;
exports.serve = serve;
exports.default = gulp.parallel(serve);