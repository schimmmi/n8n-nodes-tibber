const path = require('path');
const { task, src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

task('clean', cleanDist);
task('build:tsc', buildTypeScript);
task('build:icons', copyIcons);
task('build:copy', copyFiles);
task('build', series('clean', 'build:tsc', 'build:icons', 'build:copy'));

function cleanDist() {
	return src('dist', { read: false, allowEmpty: true })
		.pipe(clean());
}

function buildTypeScript() {
	return tsProject.src()
		.pipe(tsProject())
		.pipe(dest('dist'));
}

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

function copyFiles() {
	return src(['package.json']).pipe(dest('dist'));
}