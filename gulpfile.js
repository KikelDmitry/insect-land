const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),

    //imagemin
    imagemin = require('gulp-imagemin'),
    imageminPngQuant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),

    //svgSprite
    svgSprite = require('gulp-svg-sprite'),
    cheerio = require('gulp-cheerio'),
    svgmin = require('gulp-svgmin'),

    //globs
    src = 'src/',
    dest = 'dist/';

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('scss', function () {
    return gulp.src(src + 'scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(dest + 'css'))
        .pipe(browserSync.stream())
});

gulp.task('svgSprite', function () {
    return gulp.src(src + 'img/svg/sprite/**/*.svg') // svg files for sprite
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // .pipe(cheerio({
        //     run: function ($) {
        //         $('[fill]').removeAttr('fill');
        //         $('[stroke]').removeAttr('stroke');
        //         $('[style]').removeAttr('style');
        //     },
        //     parserOptions: { xmlMode: true }
        // }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"  //sprite file name
                }
            },
        }
        ))
        .pipe(gulp.dest(dest + 'img/svg'));
});

gulp.task('pug', function () {
    return gulp.src(src + 'pug/**/!(_)*.pug')
        .pipe(pug({
            pretty: true, //deprecated ¯\_(ツ)_/¯
            basedir: './'
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
});

gulp.task('scripts', function(done) {
    let scriptsArray = [
        src + 'js/lib/jquery-3.4.1.min.js',
        src + 'js/lib/jquery.fancybox.js',
        src + 'js/lib/slick.js',
        src + 'js/lib/svg4everybody.min.js',
        src + 'js/main.js'
    ]
    gulp.src(scriptsArray)
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }
        ))
        .pipe(gulp.dest(dest + 'js'))
        .pipe(browserSync.stream())
    done();
})


gulp.task('imagemin', function (done) {
    gulp.src([src + 'img/**/*.{png,jpg,svg,gif}', '!' + src + 'img/svg/sprite/**/*.svg'])
        .pipe(imagemin([
            //png
            imageminPngQuant({
                speed: 1,
                quality: [0.95, 1] //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //jpg
            imagemin.mozjpeg({
                progressive: true,
                quality: 90
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            })
        ]))
        .pipe(gulp.dest(dest + 'img'));
    done();
});

function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('watch', function () {
    gulp.watch(src + 'scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch(src + 'js/*.js', gulp.parallel('scripts'));
    gulp.watch(src + 'pug/**/*.pug', gulp.parallel('pug'));
});

gulp.task('dev', gulp.parallel('scss', 'pug', 'browser-sync', 'watch'));

gulp.task('build', gulp.parallel('scss', 'pug', 'imagemin', 'svgSprite', 'scripts'));

