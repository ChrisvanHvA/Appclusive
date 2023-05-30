import gulp from 'gulp';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';

(() => {
	return gulp
		.src('./public/css/**/*.css')
		.pipe(concat(`index.css`))
		.pipe(cleanCSS())
		.pipe(
			autoPrefixer({
				cascade: false
			})
		)
		.pipe(gulp.dest('./public/css'));
})();
