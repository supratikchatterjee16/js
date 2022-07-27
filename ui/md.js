class MDView extends CustomElement {
    constructor() {
        super();
    }
    
    format(content){
        
    }
    connectedCallback() {
        let source = this.getAttribute("src");
        if(!window.markdownit){
            console.error("Markdown-It was not loaded.\nAdd : <script src=\"https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js\"></script>\nAborting.");
            console.info("We depend on Markdown It for the official implementation of Markdown rendering in JS. We aren't adding this, as you(the developer) need to implement it by yourself.");
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
