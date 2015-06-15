var gulp = require('gulp');
var uglify= require('gulp-uglify');
var config=require('./gulp-config.json');
var rename= require('gulp-rename');
var jsHint= require('gulp-jshint');


//Directories
var sourceDirectory=config.directories.source;
var distDirectory= config.directories.min;
var currentDirectory='.';

var karma=require('karma').server;

//Source paths
var sourceFileName=config.fileNames.source;

var sourcePath=sourceDirectory+'/'+sourceFileName;

//Min paths
var minFileName=config.fileNames.min;

var minDistPath=distDirectory+'/'+minFileName;

gulp.task('test',function(done){

    console.log('Running tests....');

    karma.start({
        configFile:__dirname+'/test.karma.conf.js',
        singleRun: true

    },function(exitCode){

        if( exitCode == 0){
           done();
        }else{

            process.exit(exitCode);
        }
    });
});

gulp.task('minify',['lint'],function(){

    console.log('\nReading file '+sourcePath);
    console.log('Renaming file to '+minFileName);
    console.log('Writing minified file to '+minDistPath+' and '+currentDirectory+'\n');

    return gulp.src(sourcePath)
        .pipe(gulp.dest('.'))
        .pipe(uglify())
        .pipe(rename(minFileName))
        .pipe(gulp.dest(distDirectory))
        .pipe(gulp.dest('.'));

});

gulp.task('lint',['test'],function(cb){

    console.log('Linting '+sourcePath);

    return gulp.src(sourcePath)
        .pipe(jsHint())
        .pipe(jsHint.reporter('jshint-stylish',{verbose:true}))
        .pipe(jsHint.reporter('fail'));

});

gulp.task('build',['test','minify','lint'],function(){


});

gulp.task('default',['build'],function(){

});



