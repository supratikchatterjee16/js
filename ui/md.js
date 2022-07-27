class MDView extends CustomElement {
    constructor() {
        super();
    }
    
    format(content){
        console.log(content);
        content.split('\n').forEach(line => {
            if (line.startswith("#")) { // headings
                let level = 0;
                for (level = 0; level < line.length; level++)
                    if (line.charAt(level) != '#' || level == 6)// h6 is the ast header level in html
                        break;
                let element = document.createElement('h' + level);
                element.innerHTML = line.substring(level).trim();
                this.appendChild(element);
            }
            else if (line.startswith("*")) { // italic and bold

            }
            else if (line.startswith(">")) { // blockquote

            }
            else if (line.startswith("-")) {// unordered list(- )/horizontal rule(---)/tasklist(- [ ])

            }
            else if (line.startswith("`") || line.startswth('~')) {// code or code block(syntax highlighting to be added later)/ strikethrough(~~)

            }
            else if (line.startswith("[")) {// expect link/ or footnote([^x])

            }
            else if (line.startswith("![")) {// expect image

            }
            else if (line.match(/^\d/)) {// ordered list

            }
            else {// inside line markdown handling

            }

        });
    }
    connectedCallback() {
        let source = this.getAttribute("src");
        if (!source) {
            throw Error("Source not defined.");
        }
        if (source.startsWith('http') || source.startsWith('file')) {
            fetch(source)
            .then(response => response.text())
            .then(text => { format(text); });
        }
        

    }
}
customElements.define('md-view', MDView);
