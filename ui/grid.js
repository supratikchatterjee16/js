
// Grid ResponsiveElement
class GridLayout extends ResponsiveLayout {
	constructor() {
		super();
		this._orientation = "l"; // l or p for landscape and potrait
		this._potrait = "";
		this._landscape = "";
	}
	connectedCallback() {
		this._potrait = this.getAttribute("potrait");
		this._landscape = this.getAttribute("landscape");
		this.style.display = "grid";
		this.style.gridTemplateAreas = '\'' + this._landscape.split(';').join('\' \'') + '\'';
		this.style.gridAutoColumns = "1fr";
		this.style.gap = this.getAttribute('gap');
	}
}

class GridComponent extends CustomElement {
	constructor() { super(); }
	connectedCallback() {
		this.style.gridArea = this.getAttribute('name');
		// this.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
		// this.style.display = "block";
		this.style.maxWidth = "100%";
	}
}

// class RowComponent extends CustomElement{}
// class ColumnComponent extends CustomElement{}
customElements.define('grid-component', GridComponent);
customElements.define('grid-layout', GridLayout);
// customElements.define('row-component', RowComponent);
// customElements.define('column-component', ColumnComponent);
