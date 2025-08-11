const path = require('path');
const { task, src, dest, series } = require('gulp');
const clean = require('gulp-clean');

task('clean', cleanDist);
task('build:icons', copyIcons);
task('build', series('clean', 'build:icons'));

function cleanDist() {
	return src('dist', { read: false, allowEmpty: true })
		.pipe(clean());
}

function copyIcons() {
	const nodeSource = path.resolve('src', 'nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'src', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('src', 'credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'src', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}