/**
 * Created by zhengjunling on 2016/11/24.
 */

var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create();

gulp.task('lessToCss', function () {
    gulp.src('src/less/common.less')
        .pipe(less())
        .pipe(gulp.dest('app/src/css'));
});

gulp.task('browser-sync',function(){
    browserSync.init({
        proxy:"http://localhost:7080/",
        files:["src/less/**/*","views/**/*"],
        port: 7000
    });
    gulp.watch('src/less/**/*', ['lessToCss']);
})

gulp.task('dev', ['browser-sync','lessToCss']);