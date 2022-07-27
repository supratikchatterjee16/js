class MDView extends CustomElement {
    constructor() {
        super();
    }
    
    format(content){
        console.log(content);
        content.split('\n').forEach(line => {
            switch(line.charAt(0)){
                case '#' : {}; break;
                case '*' : {}; break;
                case '>' : {}; break;
                case '-' : {}; break;
                case '`' :
                case '~' : {}; break;
                case '[' : {}; break;
                case '!' : {}; break;
                case '0' :
                case '1' :
                case '2' :
                case '3' :
                case '4' :
                case '5' :
                case '6' :
                case '7' :
                case '8' : 
                case '9' : {}; break;
                default  : {}; break;
            }
            if (line.startsWith("#")) { // headings
                let level = 0;
                for (level = 0; level < line.length; level++)
                    if (line.charAt(level) != '#' || level == 6)// h6 is the ast header level in html
                        break;
                let element = document.createElement('h' + level);
                element.innerHTML = line.substring(level).trim();
                this.appendChild(element);
            }
            else if (line.startsWith("*")) { // italic and bold

            }
            else if (line.startsWith(">")) { // blockquote

            }
            else if (line.startsWith("-")) {// unordered list(- )/horizontal rule(---)/tasklist(- [ ])

            }
            else if (line.startsWith("`") || line.startswth('~')) {// code or code block(syntax highlighting to be added later)/ strikethrough(~~)

            }
            else if (line.startsWith("[")) {// expect link/ or footnote([^x])

            }
            else if (line.startsWith("![")) {// expect image

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
            .then(text => { this.format(text); });
        }
        

    }
}
customElements.define('md-view', MDView);
