//Helps run the build tasks
var gulp = require('gulp');
var config = require('./gulp-config.json');

//Minifies and optimizes the module
var uglify = require('gulp-uglify');

//Used for renaming output files
var rename = require('gulp-rename');

//Used for checking the module for errors
var jsHint = require('gulp-jshint');

//Directories
var sourceDirectory = config.directories.source;
var distDirectory = config.directories.min;
var currentDirectory = '.';

//Server for running tests
var karma = require('karma').server;

//Source paths
var sourceFileName = config.fileNames.source;
var sourcePath = sourceDirectory + '/' + sourceFileName;

//Min paths
var minFileName = config.fileNames.min;
var minDistPath = distDirectory + '/' + minFileName;

/**
 * Reads in the test program configuration and runs all tests within the test directory.
 * If the tests fails the entire task fails.
 */
gulp.task('test', ['lint'], function (done) {
    karma.start({
        configFile: __dirname + '/test.karma.conf.js',
        singleRun: true

    }, function (exitCode) {

        if (exitCode == 0) {
            done();
        } else {

            process.exit(exitCode);
        }
    });
});

/**
 * Tries to minify and optimize the module code. Checks if the module has any errors in style or code
 * before ouputing the minified version.
 */
gulp.task('uglify',  function () {
    return gulp.src(sourcePath)
        .pipe(gulp.dest('.'))
        .pipe(uglify())
        .pipe(rename(minFileName))
        .pipe(gulp.dest(distDirectory))
        .pipe(gulp.dest('.'));
});


/**
 *Checks the module code for style and code errors.
 */
gulp.task('lint', function () {

    return gulp.src(sourcePath)
        .pipe(jsHint())
        .pipe(jsHint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jsHint.reporter('fail'));


});

gulp.task('build', ['test', 'uglify', 'lint'], function () {


});

gulp.task('default', ['build'], function () {

});



