import * as  gulp from "gulp"
import rename = require("gulp-rename")
import stylus = require("gulp-stylus")
import plumber = require("gulp-plumber")

import autoprefixer = require("autoprefixer")
import postcss = require("gulp-postcss")

import * as ts from "gulp-typescript"
import { FSWatcher } from "fs";

let tsProject = ts.createProject("tsconfig.json");

const dist = "./"

function acss() {
    return gulp.src(`src/**/*.styl`)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(postcss([autoprefixer()]))
        .pipe(rename({
            extname: '.acss',
        }))
        .pipe(gulp.dest(dist))
}

function tsc() {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(dist))
}

function other() {
    return gulp.src(`src/**/!(*.styl|*.ts|*.d.ts)`)
        .pipe(gulp.dest(dist));
}

console.log("starting gulp task...")
gulp.task("default", gulp.parallel(acss, tsc, other))

console.log("starting watching...")

let watcher = <FSWatcher[]>[]

watcher.push(gulp.watch(`src/**/*.styl`, acss))
watcher.push(gulp.watch(`src/**/*.ts`, tsc))
watcher.push(gulp.watch(`src/**/!(*.styl|*.ts|*.d.ts)`, other))

watcher.forEach((ele) => {
    ele.on("change", (fileName, eventType) => {
        console.log(`${fileName} changed...`)
    })

    ele.on("error", (error) => {
        console.error(error)
    })
})
