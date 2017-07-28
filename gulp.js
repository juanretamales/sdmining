var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer'); //agregamos el plugin
var browserSync = require('browser-sync').create();
//var sass = require('gulp-sass');
//var browserify = require('browserify');


gulp.task('default', ['css']);

gulp.task('serve',['css'], function() {
	// Serve files from the root of this project
    browserSync.init({
        server: "./app",
		baseDir: "./"
    });
	gulp.watch("app/scss/*.scss").on('change', browserSync.reload);
	// add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
	gulp.watch("app/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});
