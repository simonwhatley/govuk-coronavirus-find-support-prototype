// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
const marked = require('marked');

// Leave this filters line
let filters = {}

/*
  ====================================================================
  markdownToHtml
  --------------------------------------------------------------------
  Create HTML from markdown
  ====================================================================

  Usage:

  {{ "**Enter a title**" | markdownToHtml }}

  = "<strong>Enter a title</strong>"

*/

filters.markdownToHtml = (markdown) => {
  if (!markdown)
    return null;
  return html = marked(markdown);
}


// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
