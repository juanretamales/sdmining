/*
* Dependencias
*/
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer'); //agregamos el plugin
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var browserify = require('browserify');


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
	gulp.watch("app/scss/*.scss", ['sass']);
	gulp.watch("app/js/*.js", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("app"))
        .pipe(browserSync.stream());
});
// process JS files and return the stream.
gulp.task('js', function () {
   /*  return gulp.src('app/js/*.js')
        .pipe(browserify())
		.pipe(concat('javascript.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/build/')); */
		return gulp.src('app/js/*.js')
		//.pipe(browserify())
  .pipe(concat('javascript.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/'));
  //.pipe(browserSync.stream());//resetea el navegador con los cambios
});

gulp.task('js-hard', function () {
   /*  return gulp.src('app/js/*.js')
        .pipe(browserify())
		.pipe(concat('javascript.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/build/')); */
		return gulp.src('app/js/*.js')
		//.pipe(browserify())
  .pipe(concat('javascript.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/'))
  .pipe(browserSync.stream());//resetea el navegador con los cambios
});


// create a task that ensures the `js` task is complete before
// reloading browsers
 gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});
 gulp.task('js-watch-hard', ['js-hard'], function (done) {
    browserSync.reload();
    done();
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass','js-watch'], function() {
	// Serve files from the root of this project
    browserSync.init({
        server: "./app",
		baseDir: "./"
    });
	gulp.watch("app/scss/*.scss", ['sass']);
	// add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
	gulp.watch("app/js/*.js", ['js']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('css', ['sass'], function() {
	// Serve files from the root of this project
    browserSync.init({
        server: "./app",
		baseDir: "./"
    });
	gulp.watch("app/scss/*.scss", ['sass']);
	// add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('hard', ['sass','js-watch-hard'], function() {
	// Serve files from the root of this project
    browserSync.init({
        server: "./app",
		baseDir: "./"
    });
	gulp.watch("app/scss/*.scss", ['sass']);
	// add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
	gulp.watch("app/js/*.js", ['js']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});
// Asigno la tarea serve como funcion de inicio por defecto
gulp.task('default', ['css']);
