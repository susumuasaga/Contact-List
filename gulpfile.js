'use strict'

let gulp = require('gulp');
let ts = require('gulp-typescript');
let jasmine = require('gulp-jasmine');

let tsProject = ts.createProject('server/tsconfig.json');

gulp.task('compile', (done) => {
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('server/dist'))
    .on('end', done);
});

gulp.task('test', (done) => {
  gulp.src('server/dist/spec/*.spec.js')
    .pipe(jasmine())
    .on('data', () => {})
    .on('end', done);
})

gulp.task('watch', () => {
  gulp.watch('server/src/**/*.ts', gulp.series('compile', 'test'));
})