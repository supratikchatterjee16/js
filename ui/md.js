class MDView extends CustomElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let source = this.getAttribute("src");
        if (!source) {
            throw Error("Source not defined.");
        }
        let content = null;// fetch once, parse after.
        if (source.startsWith('http')) {
            fetch(source).then(response => response.text()).then(text => { content = text; });
        }
        content.split('\n').forEach(line => {
            if (line.startswith("#")) { // headings

            }
            else if (line.startswith("*")) { // italic and bold

            }
            else if (line.startswith(">")) { // blockquote

            }
            else if (line.startswith("-")) {// unordered list(- )/horizontal rule(---)/tasklist(- [ ])

            }
            else if (line.startswith("`") || line.startswth('~')) {// code or code block(syntax highlighting to be added later)

            }
            else if (line.startswith("~~~")) {// code or code block(syntax highlighting to be added later)

            }
            else if (line.startswith("[")) {// expect link

            }
            else if (line.startswith("![")) {// expect image

            }
            else if (line.match(/^\d/)) {// ordered list

            }
            else {// inside line markdown handling

            }

        });;

    }
}
customElements.define('md-view', MDView);