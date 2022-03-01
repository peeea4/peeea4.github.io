const {src, dest, watch} = require('gulp');
const minifyJs = require('gulp-uglify');
const sourceMaps = require('gulp-sourcemaps')
const concat = require('gulp-concat');

const HLTV = require('hltv-api').default
const express = require('express')
const app = express()

const jsFiles = ['./src/script.js', './node_modules/hltv-api/dist/**/*.js'];
const bundleJs = () => {
    return src(jsFiles)
        .pipe(sourceMaps.init())
        .pipe(minifyJs())
        .pipe(concat('bundle.js'))
        .pipe(sourceMaps.write())
        .pipe(dest('./dist/src/'));
}

const devWatch = () => {
    watch('./node_modules/hltv-api/dist/**/*.js', bundleJs);
}

const showNews = (app) => {
    app.get('/', async (req, res) => {
        const news = await HLTV.getNews()
        res.json(news)
        console.log(res, news);
    })
}
exports.default = showNews;
exports.bundleJs = bundleJs;
exports.devWatch = devWatch;
