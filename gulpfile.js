/*
  Usage:
  1. npm install //To install all dev dependencies of package
  2. npm run dev //To start development and server for live preview
  3. npm run deploy //To generate minifed files for live server
*/

var opt = {
  tailwindjs: './source/tailwind.config.js',
  src: 'source',
  dest: 'web/app'
};

var js_paths = [
  `${opt.src}/js/base/**/*.js`
];

const { src, dest, task, watch, series, parallel } = require('gulp');
const del = require('del'); //For Cleaning build/dist for fresh export
const rev = require('gulp-rev'); //For Generating revved files for production

const sass = require('gulp-sass')(require('node-sass')); //For Compiling SASS files
const postcss = require('gulp-postcss'); //For Compiling tailwind utilities with tailwind config
const concat = require('gulp-concat'); //For Concatinating js,css files
const uglify = require('gulp-terser');//To Minify JS files
const cleanCSS = require('gulp-clean-css');//To Minify CSS files
const purgecss = require('gulp-purgecss');// Remove Unused CSS from Styles

const logSymbols = require('log-symbols'); //For Symbolic Console logs :) :P

//Development Tasks
function devStyles(){
  const tailwindcss = require('tailwindcss');
  return src(`${opt.src}/sass/styles.scss`)
    .pipe(sass({ style: 'expanded', sourceComments: true }).on('error', sass.logError))
    .pipe(dest(opt.src))
    .pipe(postcss([
      tailwindcss(opt.tailwindjs),
      require('autoprefixer'),
    ]))
    .pipe(concat({ path: 'styles.css'}))
    .pipe(dest(opt.dest));
}

function devScripts(){
  return src(js_paths)
    .pipe(concat({ path: 'scripts.js'}))
    .pipe(dest(opt.dest));
}

function watchFiles(){
  watch([opt.tailwindjs, `templates/**/*.twig`, `${opt.src}/sass/**/*.scss`],series(devStyles));
  watch(`${opt.src}/js/**/*.js`,series(devScripts));
  console.log("\n\t" + logSymbols.info,"Watching for Changes...\n");
}

function fullClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning app folder...\n");
  return del([`${opt.dest}/*`]);
}

function devClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning dev files from app folder...\n");
  return del([`${opt.dest}/styles.css`, `${opt.dest}/scripts.js`]);
}

//Production Tasks (Optimized Build for Live/Production Sites)
function prodStyles(){
  return src(`${opt.dest}/styles.css`)
  .pipe(purgecss({
    content: ['templates/**/*.twig', 'source/js/other/*.js'],
    defaultExtractor: content => {
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
      const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
      return broadMatches.concat(innerMatches)
    }
  }))
  .pipe(cleanCSS())
  .pipe(dest(opt.dest));
}

function prodScripts(){
  return src(js_paths)
    .pipe(concat({ path: 'scripts.js'}))
    .pipe(uglify())
    .pipe(dest(opt.dest));
}

function prodRev(){
  return src(`${opt.dest}/*`)
    .pipe(rev())
    .pipe(dest(opt.dest))
    .pipe(rev.manifest())
    .pipe(dest(opt.dest));
}

function buildFinish(done){
  console.log("\n\t" + logSymbols.info,`Production CSS and JS build is complete.\n`);
  done();
}

exports.default = series(
  fullClean, // Clean App Assets Folder
  parallel(devStyles, devScripts), //Run All tasks in parallel
  watchFiles // Watch for Live Changes
);

exports.deploy = series(
  fullClean, // Clean Build Folder
  devStyles, // Generate the styles
  parallel(prodStyles, prodScripts), //Run All tasks in parallel
  prodRev, // Generate rev tagged files
  devClean, // Remove the dev files
  buildFinish
);
