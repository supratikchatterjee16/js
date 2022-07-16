// Single Page ResponsiveElement
class SinglePageLayout extends ResponsiveLayout {
	constructor() {
		super();
		// this.attachShadow({mode : 'open'});
		this.rendered = false;
	}
	static get observedAttributes() {// required for attributeChangedCallback
		return ['menu'];
	}
	_resetGridTemplateAreas() {
		let layoutType = this.getAttribute("menu");
		// console.log(layoutType);
		switch (layoutType) {
			case "left": this.style.gridTemplateAreas = "'header header header header header' 'leftmenu main main main main'"; break;
			case "right": this.style.gridTemplateAreas = "'header header header header header' 'main main main main rightmenu'"; break;
			case "double": this.style.gridTemplateAreas = "'header header header header header' 'leftmenu main main main rightmenu'"; break;
			default: this.style.gridTemplateAreas = "'header'\n'main'";
		}
		// console.log(this.style.gridTemplateAreas);
		return layoutType;
	}
	connectedCallback() {
		// this.style.background = "black";
		this.style.width = "100%";
		this.style.height = "100%";
		this.style.display = "grid";
		this.style.gridGap = "0pt";
		this.style.padding = "0pt";
		this.style.visibility = "visible";
		this.style.gridAutoColumns = "1fr";
		// Get type of layout
		this._resetGridTemplateAreas();
	}
	disconnectedCallback() { console.log(this + " DisconnectedCallback"); }
	attributeChangedCallback(name, oldValue, newValue) {
		// console.log(this.toString() + " AttributeChangedCallback");
		switch (name) {
			case "menu": this._resetGridTemplateAreas(); break;
			case "colors": this._resetColors(); break;
			case "dark-theme": this.toggleDarkTheme(); break;
		}
	}
	adoptedCallback() { console.log(this + 'AdoptedCallback'); }
	toString() { return "[object SinglePageLayout]"; }
}
class LeftpaneComponent extends CustomElement {
	constructor() { super(); }
	connectedCallback() {
		this.style.gridArea = "leftmenu";
		this.theme = this.parentElement.theme;
	}
}
class RightpaneComponent extends CustomElement {
	constructor() { super(); }
	connectedCallback() {
		this.style.gridArea = "rightmenu";
		this.theme = this.parentElement.theme;
	}
}
customElements.define('leftpane-component', LeftpaneComponent);
customElements.define('rightpane-component', RightpaneComponent);

class Navbar extends CustomElement {
	constructor() {
		super();
	}
	static get observedAttributes() {// required for attributeChangedCallback
		return ['background'];
	}
	_setBackground() {
		let background = this.getAttribute("background");
		if (background != null) this.style.background = background;
	}
	connectedCallback() {
		// this.style.background = "black";
		this.style.top = "0pt";
		this.style.gridArea = 'header';
		this.style.padding = "10pt";
		this.style.zIndex = "20";
		// console.log(this.parentNode, this.parentNode.theme);
		this.theme = this.parentNode.theme;
		this.style.background = this.theme.primary;
		if (this.parentNode instanceof TabbedPageLayout) {
			// this.style.paddingBottom = "5pt";
			// TabsKeeper.appendNewAt(this);
		}
		else {
			this.style.boxShadow = "0px 5px 20px rgba(0, 0, 0, 0.2)";
		}
		this._setBackground();
	}
	disconnectedCallback() { console.log(this + " DisconnectedCallback"); }
	attributeChangeCallback() { console.log(this + " AttributeChangeCallback"); }
	toString() { return "[object Navbar]"; }
}
class NavbarTitle extends CustomElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.style.paddingLeft = "10pt";
		this.style.fontSize = "16pt";
		this.style.fontVariant = "small-caps";
		this.theme = this.parentNode.theme;
		this.style.color = this.theme.onPrimary;
	}
	disconnectedCallback() { console.log(this + " DisconnectedCallback"); }
	attributeChangeCallback() { console.log(this + " AttributeChangeCallback"); }
	toString() { return "[object NavbarMenu]"; }
}

/**
 * Navbar Menu item. This can be added using the tag 'nav-menu'
 * @author Supratik Chatterjee
 */
class NavbarMenu extends ResponsiveElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.style.float = "right";
		this.theme = this.parentNode.theme;
		// console.log(this.parentNode);
		// this.style.right = "0pt";
	}
	disconnectedCallback() { console.log(this + " DisconnectedCallback"); }
	attributeChangeCallback() { console.log(this + " AttributeChangeCallback"); }
	toString() { return "[object NavbarMenu]"; }
}
class Footer extends CustomElement { }
class Main extends CustomElement {
	constructor() { super(); }
	connectedCallback() {
		this.style.gridArea = 'main';
		this.theme = this.parentNode.theme;
		this.style.background = this.theme.background;
	}
	disconnectedCallback() { }
	static get observedAttributes() { }
	attributeChangedCallback(name, before, after) { }
	toString() { return "[object Main(SinglePageLayout)]"; }
}
customElements.define('nav-title', NavbarTitle);
customElements.define('nav-menu', NavbarMenu);
customElements.define('navbar-component', Navbar);
customElements.define('main-area', Main);
customElements.define('single-page-layout', SinglePageLayout);
