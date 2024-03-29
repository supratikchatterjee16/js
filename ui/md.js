class MDView extends CustomElement {
    constructor() {
        super();
    }
    format(content){
        this.innerHTML = MDView.mdHtml.render(content);
        if(window.hljs)
           hljs.highlightAll();
    }
    connectedCallback() {
        let source = this.getAttribute("src");
        if(!window.markdownit){
            console.error("Markdown-It was not loaded.\nAdd : <script src=\"https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js\"></script>\nAborting.");
            console.info("We depend on Markdown It for the official implementation of Markdown rendering in JS. We aren't adding this, as you(the developer) need to implement it by yourself.\n Furthermore for syntax highlighting, highlight.js is used. Simply adding it will enable it's use.");
            return;
        }
        else if(!MDView.mdHtml){// the below has been adapted from https://markdown-it.github.io/index.js
            MDView.mdHtml = window.markdownit("commonmark");
//             this.mdSrc = window.markdownit("commonmark");
            
            // Beautify output of parser for html content
            MDView.mdHtml.renderer.rules.table_open = function() {
                return '<table class="table table-striped">\n';// NOTE : Bootstrap usage. Remove.
            };
            // Replace emoji codes with images
            MDView.mdHtml.renderer.rules.emoji = function(token, idx) {
                return window.twemoji.parse(token[idx].content);// NOTE : Twitter Emoji pack. Throw out.
            };
            
            function injectLineNumbers(tokens, idx, options, env, slf) {
                var line;
                if (tokens[idx].map && tokens[idx].level === 0) {
                    line = tokens[idx].map[0];
                    tokens[idx].attrJoin("class", "line");
                    tokens[idx].attrSet("data-line", String(line));
                }
                return slf.renderToken(tokens, idx, options, env, slf);
            }
            MDView.mdHtml.renderer.rules.paragraph_open = MDView.mdHtml.renderer.rules.heading_open = injectLineNumbers;
        }
        if (!source) {
            throw Error("Source not defined.");
        }
        if (source.startsWith('http') || source.startsWith('file')) {
            fetch(source)
            .then(response => response.text())
            .then(text => { this.format(text); });
        }
    }
}
customElements.define('md-view', MDView);
