/*!
 * Conceivilize UI
 * @copyright 2022-2032 Conceivilize, Supratik Chatterjee
 * @license AGPL
 */
/**
* File for storing all UI components to be used throughout the application frontend
* @filename UI.js
* @author Supratik Chatterjee
*/
// We take some hints from the following link to structure layouts
// https://www.uxpin.com/studio/blog/web-layout-best-practices-12-timeless-ui-patterns-explained/
// Z-pattern, F-pattern, Approximate Horizontal Assymetry and Assymetry
// cannot be fixed into a layout
// We provide utilities to enable those layouts

/**
* Custom elements basic functions
* constructor(){super();}
* connectedCallback(){}
* disconnectedCallback(){}
* static get observedAttributes(){}
* attributeChangedCallback(name, before, after){}
* toString(){return "[object Main(SinglePageLayout)]";}
*/

// prepare base
// document.body.style.margin = '0pt'; // causes null pointer exception

// # Events

/**
* Script to re-render the window on reload
* @param event
* @return null
*/
window.onresize = function (event) {
	const trigger_update = function (element) {
		Array.from(element.children).forEach((element) => trigger_update(element));
		if (element.repaint != null) {
			try {
				element.repaint();
			} catch (e) { console.error(e); }
		}
	};
	trigger_update(document.body);
};


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/** CustomElement base class for creating new environment compliant component.
 * @author Supratik Chatterjee
 */
class CustomElement extends HTMLElement {
	// This is a static element.
	// once created, is not updated
	constructor() {
		super();
		this.theme = document.body.theme;
		// element created
	}
	get theme() { return this.theme; }
	set theme(theme) { this.theme = theme; }
	connectedCallback() {
		// browser calls this method when the element is added to the document
		// (can be called many times if an element is repeatedly added/removed)
	}

	disconnectedCallback() {
		// browser calls this method when the element is removed from the document
		// (can be called many times if an element is repeatedly added/removed)
	}

	static get observedAttributes() {
		return [/* array of attribute names to monitor for changes */];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// called when one of attributes listed above is modified
	}

	adoptedCallback() {
		// called when the element is moved to a new document
		// (happens in document.adoptNode, very rarely used)
	}
	repaint() { }
	toString() { return "[object ResponsiveElement]"; }
	get theme() { return this._theme; }
	set theme(theme) { this._theme = theme; }
}
class Layout extends HTMLElement {
	// This is a static element.
	// once created, is not updated
	constructor() {
		super();
		// element created
		this.theme = document.body.theme;
	}

	connectedCallback() {
		// browser calls this method when the element is added to the document
		// (can be called many times if an element is repeatedly added/removed)
	}

	disconnectedCallback() {
		// browser calls this method when the element is removed from the document
		// (can be called many times if an element is repeatedly added/removed)
	}

	static get observedAttributes() {
		return [/* array of attribute names to monitor for changes */];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// called when one of attributes listed above is modified
	}

	adoptedCallback() {
		// called when the element is moved to a new document
		// (happens in document.adoptNode, very rarely used)
	}
	toString() { return "[object Layout]"; }
	set theme(theme) {
		if (theme instanceof Theme) {
			this._theme = theme;
		}
	}
	get theme() { return this._theme; }
}

/**
* ResponsiveElement is a resizable component that adjusts to the viewport size.
* Rechecks the viewport dimensions at every render.
* Any changes in the bubble causes a re-render of this component.
*/
class ResponsiveElement extends CustomElement {

	constructor() {
		super();
		this._viewport_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		this._viewport_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		this._viewport_orientation = 'landscape';

		this.calculateViewArea();
	}

	/**
	* Calculates the viewport dimensions, or recieve them from the parent.
	* @param null
	* @return null
	*/
	calculateViewArea() {
		if (this.parentNode) {
			if (this.parentNode instanceof ResponsiveElement)
				this._viewport_width = this.parentNode._viewport_width;
			this._viewport_height = this.parentNode._viewport_height;
			this._viewport_orientation = this.parentNode._viewport_orientation;
		}
		this._viewport_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		this._viewport_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		this._viewport_orientation = (this.viewport_height >= this.viewport_width) ? 'potrait' : 'landscape';

	}
	getOrientation() {
		return this._viewport_orientation;
	}
	toString() { return "[object ResponsiveLayout]"; }
}

class ResponsiveLayout extends Layout {
	constructor() {
		super();
		this._viewport_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		this._viewport_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		this._viewport_orientation = 'landscape';
		this.calculateViewArea();
	}
	/**
	* Calculates the viewport dimensions, or recieve them from the parent.
	* @param null
	* @return null
	*/
	calculateViewArea() {
		this._viewport_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		this._viewport_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		this._viewport_orientation = (this.viewport_height >= this.viewport_width) ? 'potrait' : 'landscape';
	}
	getOrientation() {
		return this._viewport_orientation;
	}
	toString() { return "[object ResponsiveLayout]"; }
}

class StaticElement extends HTMLElement {
	// This is a contant element
	// Once defined, the dimesnions do not change
	constructor() {
		super();
	}
	toString() { return "[object ConstantLayout]"; }
}
class InputElement extends HTMLInputElement {
	constructor() {
		super();
	}
	repaint() { }
	toString() { return "[object InputComponent]"; }
}

console.log("Hi from your UI library.\nReminder : Call $ui() for some minor environment adjustments post load.");
function $ui() {
	// <meta name="viewport" content="width=device-width, initial-scale=1">
	let metaViewport = document.createElement('meta');
	metaViewport.name = 'viewport';
	metaViewport.content = 'width=device-width, initial-scale=1, height=device-height';
	document.head.appendChild(metaViewport);
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.body.theme = MaterialDark;
	} else {
		document.body.theme = MaterialLight;
	}
	document.body.style.margin = "0pt";
}

