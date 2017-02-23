const metalsmith = require('metalsmith');
const layouts    = require('metalsmith-layouts');
const markdown   = require('metalsmith-markdown');
const sass       = require('metalsmith-sass');
const serve      = require('metalsmith-serve');
const watch      = require('metalsmith-watch');

metalsmith(__dirname)
  .metadata({
    site: {
      title: 'scaleware.co.uk',
      url: 'https://scaleware.co.uk'
    }
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(sass({
    outputStyle: "expanded"
  }))
  .use(serve({
    port: 3030,
    verbose: true
  }))
  .use(watch({
    pattern: '**/*',
    livereload: true
  }))
  .build(err => {
    if (err) {
      return console.log(err);
    }
    console.log('Build Complete!');
  });