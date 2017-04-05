/**
 * Created by Donny on 17/3/23.
 */
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("js", function () {
    return gulp.src(["./js/*/*.js", "./js/*.js"])
        .pipe(concat("bundle.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./build/"));
});

// 静态服务器
gulp.task("serve", ["js"], function () {
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });

        gulp.watch([
            "*.html",
            "tpls/*.html",
            "css/*.css"
        ], ["reload"]).on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });

        gulp.watch([
            "js/*.js",
            "js/**/*.js"
        ], ["js", "reload"]).on("change", function (event) {
            console.log("File " + event.path + " was " + event.type + ", running tasks...");
        });
    }
);

gulp.task("reload", function () {
    browserSync.reload();
});

gulp.task("default", ["serve"]);