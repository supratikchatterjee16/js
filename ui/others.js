// Other components
class CollapsibleSections extends ResponsiveElement { }
customElements.define('collapsible-sections', CollapsibleSections);

class DirectoryLayout extends ResponsiveElement {
	// This is for making a directory kind of structure
	// An example of this is available on the explorer section of code editors

}
customElements.define('directory-container', DirectoryLayout);

class SearchComponent extends InputElement {
	constructor() { }
}
customElements.define('search-component', SearchComponent);


class OverlayComponent extends Element {
	constructor() {
		super();
		this.blurTarget = null;
	}
	connectedCallback() {
		this.style.display = "none";
		this.style.height = "100vh";
		this.style.width = "100vw";
		this.style.position = "fixed";
		this.style.top = this.style.left = "0pt";
		this.style.textAlign = "center";
		this.style.alignItems = "center";
		this.style.flexDirection = "column";
		this.style.justifyContent = "center";
		this.setInactive();
	}
	addBlurTarget(target) {
		this.blurTarget = target;
	}
	setActive(object = null) {
		this.hidden = false;
		this.style.display = "flex";
		this.blurTarget.style.filter = "blur(3pt)";
		if (object) this.innerHTML = object;
	}
	setInactive() {
		try {
			this.blurTarget.style.filter = "none";
		} catch (e) { console.warn(e); }
		this.innerHTML = "No content";
		this.hidden = true;
		this.style.display = "none";
	}
}
customElements.define('overlay-component', OverlayComponent);

class FillComponent extends ResponsiveElement {
	constructor() {
		super();
	}
	connectedCallback() {
		// prepare
		// We need to make this take as much space as possible
		// so how do we do that?
		// The vertical can be taken care of by spreading downwards
		// the horizontal will have to be taken care of by influencing the div above this.
		let position = 'relative';
		try {
			position = this.getAttribute('position');
			this.style.position = position;
		} catch (e) { console.error('FillComponent error : ', e); }
		if (position != 'absolute' || position != 'fixed') {
			this.parentNode.style.width = "100%";
			this.parentNode.style.height = "100%";
			this.style.width = this.parentNode.style.width;
			this.style.height = this.parentNode.style.height;
		}
		else {
			this.style.width = "100%";
			this.style.height = "100%";
		}

		if (this.getAttribute('center')) {
			this.style.display = 'flex';
			this.style.alignItems = 'center';
			this.style.justifyContent = 'center';
		}
		// let top = this.getBoundingClientRect().top + window.scrollY;
		// let height = window.innerHeight - top;
	}
	setActive(object = null) {
		// this.hidden = false;
		// this.style.display = "flex";
		// this.blurTarget.style.filter = "blur(3pt)";
		// if (object) this.innerHTML = object;
	}
	setInactive() {
		// try {
		// 	this.blurTarget.style.filter = "none";
		// } catch (e) { console.warn(e); }
		// this.innerHTML = "No content";
		// this.hidden = true;
		// this.style.display = "none";
	}
}
customElements.define('fill-component', FillComponent);