'use strict'

let gulp = require('gulp');
let ts = require('gulp-typescript');
let jasmine = require('gulp-jasmine');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

let tsProject = ts.createProject('server/tsconfig.json');

gulp.task('compile', (done) => {
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
    .on('end', done);
});

gulp.task('test', (done) => {
  gulp.src('dist/spec/*.spec.js')
    .pipe(jasmine({
      reporter: new SpecReporter({ spec: { displayPending: true } })
    }))
    .on('data', () => {})
    .on('end', done);
})

gulp.task('watch', () => {
  gulp.watch('server/**/*.ts', gulp.series('compile', 'test'));
})