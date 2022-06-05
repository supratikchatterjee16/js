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

// Icons
const
	_closeIcon = '<svg height="10" width="10" pointer-events="none"><path d="M0 0 L10 10 M10 0 L0 10 Z" stroke="#334433" stroke-width="2"/></svg>',
	_infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><defs><style>.a{fill:#9b9b9b;}</style></defs><path class="a" d="M9.75,14.25h1.5V9.75H9.75ZM10.5,3A7.5,7.5,0,1,0,18,10.5,7.5,7.5,0,0,0,10.5,3Zm0,13.5a6,6,0,1,1,6-6A6.008,6.008,0,0,1,10.5,16.5ZM9.75,8.25h1.5V6.75H9.75Z" transform="translate(-3 -3)"/></svg>',
	_refreshIcon = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14.991\" height=\"15\" viewBox=\"0 0 14.991 15\"><defs><style>.a{fill:#faa51a;}</style></defs><path class=\"a\" d=\"M18.8,8.2a7.5,7.5,0,1,0,1.95,7.172H18.8a5.622,5.622,0,1,1-5.3-7.5,5.545,5.545,0,0,1,3.956,1.669l-3.019,3.019h6.563V6Z\" transform=\"translate(-6.015 -6)\"/></svg>',
	_downArrowIcon = '',
	_sortIcon = '',
	_sortAlphaIcon = '',
	_sortNumeroIcon = '',
	_searchIcon = '';

// prepare base
// document.body.style.margin = '0pt'; // causes null pointer exception

// # Events

/**
* Script to re-render the window on reload
* @param event
* @return null
*/
// window.onresize = function(event){
// 	const trigger_update = function(element){
// 		Array.from(element.children).forEach((element) => trigger_update(element));
// 		if(element.repaint != null){
// 			try{
// 				element.repaint();
// 			}catch(e){console.error(e);}
// 		}
// 	};
// 	trigger_update(document.body);
// };


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

class Theme {
	constructor() {
		try {
			this.name = null;
			this._primary = null;
			this._onPrimary = null;
			this._primaryVariant = null;
			this._secondary = null;
			this._secondaryVariant = null;
			this._background = null;
			this._onBackground = null;
			this._surface = null;
			this._onSurface = null;
			this._warn = null;
			this._error = null;
		} catch (e) { console.log(e); }
	}
	get primary() { return this._primary; }
	set primary(x) { this._primary = x; }
	get onPrimary() { return this._onPrimary; }
	set onPrimary(x) { this._onPrimary = x; }
	get primaryVariant() { return this._primaryVariant; }
	set primaryVariant(x) { this._primaryVariant = x; }
	get secondary() { return this._secondary; }
	set secondary(x) { this._secondary = x; }
	get secondaryVariant() { return this._secondaryVariant; }
	set secondaryVariant(x) { this._secondaryVariant = x; }
	get background() { return this._background; }
	set background(x) { this._background = x; }
	get onBackground() { return this._onBackground; }
	set onBackground(x) { this._onBackground = x; }
	get surface() { return this._surface; }
	set surface(x) { this._surface = x; }
	get onSurface() { return this._onSurface; }
	set onSurface(x) { this._onSurface = x; }
	get warn() { return this._warn; }
	set warn(x) { this._warn = x; }
	get error() { return this._error; }
	set error(x) { this._error = x; }

	toString() { return "[object Theme(" + this.name + ")]"; }
}

class MaterialLight extends Theme {
	constructor() {
		super();
		this._primary = "#4646D6";
		this._onPrimary = "#fff";
		this._primaryVariant = "#02D0C6";
		this._secondary = "#03DAC6";
		this._secondaryVariant = "#018786";
		this._background = "rgba(250, 250, 250, 1)";
		this._onBackground = "#000000";
		this._surface = "#FFFFFF";
		this._onSurface = "#000000";
		this._warn = "#00FFFF";
		this._onWarn = "#FFFFFF";
		this._error = "#FF0000";
		this._onError = "#FFFFFF";
		this.name = "material-light";
	}
}
class MaterialDark extends Theme {
	constructor() {
		super();
		this._primary = "#6200EE";
		this._onPrimary = "#000";
		this._primaryVariant = "#3700B3";
		this._secondary = "#03DAC6";
		this._secondaryVariant = "#018786";
		this._background = "#000";
		this._onBackground = "#fff";
		this._surface = "#000";
		this._onSurface = "#fff";
		this._warn = "#00FFFF";
		this._onWarn = "#FFFFFF";
		this._error = "#FF0000";
		this._onError = "#FFFFFF";
		this.name = "material-dark";
	}
}

/** Element base class for creating new environment compliant component.
 * @author Supratik Chatterjee
 */
class Element extends HTMLElement {
	// This is a static element.
	// once created, is not updated
	constructor() {
		super();
		this.theme = new MaterialDark();
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
		this.theme = new MaterialLight();
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
class ResponsiveElement extends Element {

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

console.log("Hi from your UI library.\nReminder : call prepareUi() for some minor environment adjustments post load.");
function prepareUi() {
	document.body.style.margin = "0pt";
	// window.onresize = function (e) { ; };
}

