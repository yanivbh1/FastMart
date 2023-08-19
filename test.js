const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://medium.com/memphis-dev/how-to-build-your-own-wolt-app-b220d738bb71')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});