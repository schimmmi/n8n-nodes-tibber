const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

// TypeScript project configuration
const tsProject = ts.createProject('tsconfig.json');

// Clean dist directory
gulp.task('clean', function () {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
});

// Compile TypeScript
gulp.task('build:ts', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

// Copy assets (SVG icons, etc.)
gulp.task('copy:assets', function () {
    return gulp.src('src/**/*.svg')
        .pipe(gulp.dest('dist/src'));
});

// Watch for changes
gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', gulp.series('build:ts'));
    gulp.watch('src/**/*.svg', gulp.series('copy:assets'));
});

// Build task
gulp.task('build', gulp.series('clean', 'build:ts', 'copy:assets'));

// Default task
gulp.task('default', gulp.series('build'));

// Development task
gulp.task('dev', gulp.series('build', 'watch'));