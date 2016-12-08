"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var sourcesLibJS = ['bower_components/jquery/dist/jquery.js',
        'bower_components/semantic/dist/*.min.js'];

var sourcesLibCSS = ['bower_components/semantic/dist/*.min.css'];

var font_dir = "bower_components/semantic/dist/themes/default/assets/fonts/";
var sourcesFonts = [font_dir+"*.ttf", font_dir+"*.woff", font_dir+"*.woff2",
                    font_dir+"*.eot", font_dir+"*.otf", font_dir+"*.svg"]
var sourcesSASS = ['sass/*.scss'];
var sourcesJS = ['javascript/*.js'];

function compileJsFile(task,source,jsFile){
    gulp.task(task, function () {
        return gulp.src(source)
            .pipe(concat(jsFile))
            .pipe(sourcemaps.write())
            .pipe(uglify())
            .pipe(gulp.dest('js'));
    });
}

function compileSassFile(task,source,sassFile){
    gulp.task(task, function () {
        return gulp.src(source)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(compass({
            css: 'css',
            sass: 'sass/'
          }))
        .pipe(sourcemaps.write())
        .pipe(concat(sassFile))
        .pipe(uglifycss())
        .pipe(gulp.dest('css'));
    });
}

// jsLib TASK : écrit un fichier minifié vendor.js à partir de jquery.min.js et semantic.min.js 
compileJsFile('jsLib',sourcesLibJS,'vendor.js');
compileJsFile('jsTask',sourcesJS,'main.js');
compileSassFile('sassTask', sourcesSASS, 'main.css');

//CSS TASK: écrit une fichier minifié vendor.css à partir de bootstrap.css
gulp.task('css', function () {
    console.log('css Task');
    return gulp.src(sourcesLibCSS)
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.write())
        .pipe(uglifycss())
        .pipe(gulp.dest('css'));
});

// Watch TASK : régénère les fichiers style.css et app.js lors de l'édition des fichiers JS et SASS
gulp.task('watch', function() 
{
    console.log('watch');
    gulp.watch(sourcesSASS, ['sassTask']);
    gulp.watch(sourcesJS, ['jsTask']);

});

// Compass TASK : Génère un fichier style.css à partir des fichiers SASS dans app/Resources/public/sass/
gulp.task('compass', function() {
    return gulp.src(sourcesSASS)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(compass({
            css: 'css',
            sass: 'sass/'
          }))
        .pipe(sourcemaps.write())
        .pipe(uglifycss())
        .pipe(gulp.dest('css'));
});

// Fonts

gulp.task('fonts', function() {
    return gulp.src(sourcesFonts)
            .pipe(gulp.dest('css/themes/default/assets/fonts/'));
});


gulp.task('style', ['css', 'compass', 'sassTask']);
gulp.task('js', ['jsLib', 'jsTask']);
gulp.task('default', ['style', 'js', 'fonts', 'watch']);