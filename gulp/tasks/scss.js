import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS-файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа-запросов
import sourcemaps from 'gulp-sourcemaps'; // Sourcemaps
import replace from 'gulp-replace'; // replace
// import pxtorem from 'gulp-pxtorem'; // pxtoremnp

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss)
    .pipe(app.plugins.if(
        app.isDev,
        sourcemaps.init()
    ))
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(sass({
        outputStyle: 'expanded',
        indentType: 'tab',
        indentWidth: 1
    }))
    // .pipe(pxtorem({
    //     rootValue: 16,
    //     unitPrecision: 5,
    //     propList: ['*'],
    //     selectorBlackList: [],
    //     propertyBlackList: ['letter-spacing'],
    //     replace: true,
    //     mediaQuery: false,
    //     minPixelValue: 0
    // }))
    .pipe(app.plugins.if(
        app.isBuild,
        autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 2 versions"],
            cascade: true
        })
    ))
    .pipe(groupCssMediaQueries())
    .pipe(app.plugins.if(
        app.isBuild,
        webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
        })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(app.plugins.if(
        app.isDev,
        sourcemaps.write()
    ))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if(
        app.isBuild,
        cleanCss()
    ))
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}