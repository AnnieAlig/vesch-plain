var gulp = require('gulp');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');

var baseDir = '';

gulp.task('sass', function() {
    return gulp.src(baseDir + 'css/*.sass')
        .pipe(sass().on( 'error', notify.onError(
            {
              message: "<%= error.message %>",
              title  : "Sass Error!"
            } ) )
        )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(baseDir + 'dist/css/'))
        // .pipe( notify( 'SASS - хорошая работа!' ) );
})

gulp.task('css', ['sass'], function () {
    return gulp.src(baseDir + 'dist/css/style.css')
        .pipe(concatCss('stylemin.css'))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(baseDir + 'dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
     return gulp.src(baseDir + 'js/*')
        .pipe(uglify())
        .pipe(gulp.dest(baseDir + 'dist/js/'))
        .pipe(browserSync.stream());
 });

 gulp.task('server', function() {
     browserSync({
         server: {
             baseDir: baseDir + 'dist/'
         },
         port: 8080
     });
     gulp.watch([baseDir + 'css/*'], ['css']);
     gulp.watch([baseDir + 'js/*'], ['scripts']);
     gulp.watch([baseDir + 'dist/*.html', baseDir + 'dist/**/*.html']).on('change', browserSync.reload);
 })

 gulp.task('default', ['server']);
