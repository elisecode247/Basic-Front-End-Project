const gulp = require("gulp")
const wiredep = require("wiredep").stream
const browserSync = require("browser-sync").create()


// Configuration
const conf = {
  src: `${__dirname}/src`,
  dest: `${__dirname}/src`
}


gulp.task('watch', () => {
  // initialize development server
  browserSync.init({
    notify: false,
    server: {
      baseDir: conf.src,
      routes: { '/bower_components': './bower_components' }
    }
  })

  // keep an eye (watch) on source file and reload if something changes
  browserSync.watch(`${conf.src}/**/*.*`, browserSync.reload)

  // watch bower dependencies, execute wiredep task if something changes
  gulp.watch(`${__dirname}/bower.json`, ['wiredep'])
})

// this task injects newly installed bower dependencies
gulp.task('wiredep', () => {
  gulp.src(`${conf.src}/**/*.*`)
      .pipe(wiredep({ src: `${conf.src}/index.html`}))
      .pipe(gulp.dest(conf.dest))
})


gulp.task('default', ['watch'])
