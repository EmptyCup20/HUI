if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}

// Include all our dependencies and return the resulting library.

define(['markdown-js/parser',
    'markdown-js/markdown_helpers',
    'markdown-js/render_tree',
    'markdown-js/dialects/gruber',
    'markdown-js/dialects/maruku'], function (Markdown) {
    return Markdown;
});
