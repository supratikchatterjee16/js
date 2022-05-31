class ScrollpaneComponent extends ResponsiveElement {
    constructor() { super(); }
    connectedCallback() {
        this.style.flex = "1 1 auto";
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.overflow = "scroll";
        // let top = this.getBoundingClientRect().top + window.scrollY;
        // let height = window.innerHeight - top;
        // this.style.height = height + 'px';
    }
}
customElements.define('scrollpane-component', ScrollpaneComponent);
