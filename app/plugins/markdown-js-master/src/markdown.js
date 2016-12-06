if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}

// Include all our dependencies and return the resulting library.

define(['./markdown-js-master/src/parser',
    './markdown-js-master/src/markdown_helpers',
    './markdown-js-master/src/render_tree',
    './markdown-js-master/src/dialects/gruber',
    './markdown-js-master/src/dialects/maruku'], function (Markdown) {
    return Markdown;
});
