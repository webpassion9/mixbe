import svgSprite from "gulp-svg-sprite";
// import cheerio from "gulp-cheerio";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`,{})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            })
        ))
        // .pipe(cheerio({
		// 	run: function ($) {
		// 		$('[fill]').removeAttr('fill');
		// 		$('[stroke]').removeAttr('stroke');
		// 		$('[style]').removeAttr('style');
		// 	},
		// 	parserOptions: {xmlMode: true}
		// }))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    // Создавать страницу с перечнем иконок
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`))
}