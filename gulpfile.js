// simple-node-mvc-starter-project ~~ MIT License
// Gulp Tasks

// Imports
import gulp   from 'gulp';
import RevAll from 'gulp-rev-all';
import size   from 'gulp-size';

// Folders
const folder = {
   tsc:      'build/step1-tsc/web-app',
   staging:  'build/step2-staging/web-app',
   minified: 'build/step3-minified/web-app',
   hashed:   'build/step4-hashed/web-app',
   };

// Tasks
const task = {
   hashWebApp() {
      return gulp.src(folder.minified + '/**/*')
         .pipe(RevAll.revision({ dontRenameFile: ['.html'] }))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest(folder.hashed));
      },
   };

// Gulp
gulp.task('hash-web-app', task.hashWebApp);
