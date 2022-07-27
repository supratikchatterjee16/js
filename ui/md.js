class MDView extends CustomElement {
    constructor() {
        super();
        if(!window.markdownit){
            attempt_markdownit_load();
        }
    }
    /**
     * Why this external viewer? This is the official one. -\(ツ)/-
     * We leverage this and don't rework against the opencollective.com
     */
    attempt_markdownit_load(){
        fetch('https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js')
            .then(response => response.text())
            .then(text => {
                (new Function(text))();
            });
    }
    format(content){
        let md_state = 0;// 0 : default, 1 : code, 
//         content.split('\n').forEach(line => {
//             switch(line.charAt(0)){// headings
//                 case '#' : {
//                     let level = 0;
//                     for (level = 0; level < line.length; level++)
//                         if (line.charAt(level) != '#' || level == 6)// h6 is the ast header level in html
//                             break;
//                     let element = document.createElement('h' + level);
//                     element.innerHTML = line.substring(level).trim();
//                     this.appendChild(element);
//                 }; break;
//                 case '*' : {// italic and bold
//                     
//                 }; break;
//                 case '>' : {// blockquote
//                     
//                 }; break;
//                 case '-' : {// unordered list(- )/horizontal rule(---)/tasklist(- [ ])
//                     
//                 }; break;
//                 case '`' :
//                 case '~' : {// code or code block(syntax highlighting to be added later)/ strikethrough(~~)
//                     
//                 }; break;
//                 case '[' : {// expect link/ or footnote([^x])
//                     
//                 }; break;
//                 case '!' : {// expect image
//                     
//                 }; break;
//                 case '0' :
//                 case '1' :
//                 case '2' :
//                 case '3' :
//                 case '4' :
//                 case '5' :
//                 case '6' :
//                 case '7' :
//                 case '8' : 
//                 case '9' : {// ordered list
//                     
//                 }; break;
//                 default  : {// inside line markdown handling
//                     
//                 }; break;
//             }
//         });
        
    }
    connectedCallback() {
        let source = this.getAttribute("src");
        if(!window.markdownit){
            console.error("Mardown-It was not loaded.\nAdd : <script src=\"https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js\"></script>\nAborting.");
            return;
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
