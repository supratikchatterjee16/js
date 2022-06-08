// Tabbed page layout
class TabbedPageLayout extends ResponsiveLayout {
	constructor() {
		super();
	}
	_resetGridTemplateAreas() {
		let layoutType = this.getAttribute("menu");
		switch (layoutType) {
			case "left": this.style.gridTemplateAreas = "'header header header header'\n'tabs tabs tabs tabs'\n'leftmenu main main main'"; break;
			case "right": this.style.gridTemplateAreas = "'header header header header'\n'tabs tabs tabs tabs'\n'main main main rightmenu'"; break;
			case "double": this.style.gridTemplateAreas = "'header header header header'\n'tabs tabs tabs tabs'\n'leftmenu main main rightmenu'"; break;
			default: this.style.gridTemplateAreas = "'header'\n'tabs'\n'main'";
		}
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
		this.appendChild(document.createElement('tabs-keeper'));
		this._resetGridTemplateAreas();
	}
	disconnectedCallback() { console.log(this + " DisconnectedCallback"); }
	static get observedAttributes() {// required for attributeChangedCallback
		return ['menu', 'colors', 'dark-theme'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		console.log(this.toString() + " AttributeChangedCallback");
		switch (name) {
			case "menu": this._resetGridTemplateAreas(); break;
		}
	}
	adoptedCallback() { console.log(this + 'AdoptedCallback'); }
	toString() { return "[object TabbedPageLayout]"; }
}
class TabsKeeper extends ResponsiveElement {
	// static appendNewAt(element){
	// 	if(element instanceof HTMLElement)
	// 		setTimeout(function(element){element.appendChild(new TabsKeeper())}, 50, element);
	// }
	constructor() {
		super();
		this.target = null;
		this.switchToNew = false;
	}
	connectedCallback() {
		this.style.top = "0pt";
		this.style.left = "0pt";
		this.style.zIndex = "19";
		this.style.width = "100%";
		this.style.gridArea = "tabs";
		this.style.display = "block";
		this.style.position = "sticky";
		this.style.background = "white";
		this.style.height = "auto";
		// this.style.paddingTop = "10pt";
		this.style.boxShadow = "0px 5px 20px -10px rgba(0, 0, 0, 0.2)";
		this.style.overflowY = "auto";
		// this.style.-ms-overflow-style: none;  /* IE and Edge */
		this.style.scrollbarWidth = "none";  /* Firefox */
		this.style.msOverflowStyle = "none";
		this.style.whiteSpace = "nowrap";
		// scrollbar hiding provision for Chrome
		if ((navigator.userAgent.indexOf("MSIE") == -1 && navigator.userAgent.indexOf("Firefox") == -1) && document.getElementById("-style-point-tabskeeper-") == null) {
			let styleNode = document.createElement("style");
			styleNode.id = "-style-point-tabskeeper-";
			styleNode.innerHTML = "tabs-keeper::-webkit-scrollbar {display: none;}";
			document.head.appendChild(styleNode);
		}
		this.theme = this.parentNode.theme;
		this.style.background = this.theme.primary;
		this.style.color = this.theme.onPrimary;

		if (this.children.length == 0) {
			// for(let i = 0; i< 50; i++) this.appendChild(TabButton.createNew());
			this.dispatchEvent(new Event("emptytabs"));
		}
	}
	addTab(title, object) {
		let tab = TabButton.createNew();
		tab.setTitle(title);
		tab.linkedObject = object;
		this.appendChild(tab);
		return tab;
	}
	select(x) {
		let element = x;
		if (x instanceof TabButton) {
			element = x;
		}
		else element = this.children[x];
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i].active) this.children[i].deactivate();
			if (this.children[i] == element) this.children[i].activate();
		}
	}
	remove(x) {
		let index = 0;
		if (x instanceof TabButton) {
			for (let i = 0; i < this.children.length; i++) {
				if (this.children[i] == x) {
					index = i;
					break;
				}
			}
		}
		else if (typeof x == "number") index = x;
		else {
			console.error("Unknown element passed", x);
			return;
		}
		delete this.childNodes[index].linkedObject;
		this.removeChild(this.childNodes[index]);
		if (this.children.length == 0) {
			this.dispatchEvent(new Event("emptytabs"));
		}
		else {
			this.select(index - 1);
		}
	}
}
class CloseButton extends ResponsiveElement {
	constructor() { super(); }
	connectedCallback() {
		this.innerHTML = _closeIcon;
		this.style.marginLeft = "10pt";
		this.style.cursor = "pointer";
	}
}
class TabButton extends ResponsiveElement {
	constructor() {
		super();
		this.registeredObject = null;
		this.state = null;
		this.active = false;
		this._titlePane = document.createElement('span');
		if (this.innerHTML == '')
			this._titlePane.innerHTML = "untitled";
		else
			this._titlePane.innerHTML = this.innerHTML;
		this.activateEvent = new CustomEvent("activate", { bubbles: false });
		this.deactivateEvent = new CustomEvent("deactivate", { bubbles: false });

	}
	static createNew() {
		let tab = document.createElement('tab-button');
		return tab;
	}
	connectedCallback() {
		this.style.display = "inline-block";
		this.style.padding = "5px";
		this.style.paddingLeft = "10px";
		this.style.cursor = "pointer";
		this.style.border = "1px solid rgba(0, 0, 0, 0.3)";
		this.style.userSelect = "none";
		this.style.mozUserSelect = "none";
		this.style.webkitUserSelect = "none";
		this.style.msUserSelect = "none";
		this.style.borderRadius = "10% 10% 0 0";
		this.theme = this.parentNode.theme;
		this.style.background = this.theme.primary;
		this.style.color = this.theme.onPrimary;
		// this.style.borderRadius = "2pt";
		this.verticalAlign = "middle";
		this.appendChild(this._titlePane);
		let closeButton = document.createElement('close-button');
		this.appendChild(closeButton);
		this.addEventListener("click", (event) => { this.parentNode.select(this); });
		closeButton.addEventListener("click", (event) => { event.stopPropagation(); event.target.parentNode.parentNode.remove(event.target.parentNode); });
	}
	setTitle(title) { this._titlePane.innerText = title; this.title = title; }
	register(object) { this.registeredObject = object; }
	activate() {
		this.style.background = this.theme.background;
		this.style.color = this.theme.onBackground;
		this.style.borderBottomColor = this.theme.background;
		this.active = true;
		this.dispatchEvent(this.activateEvent);
	}
	selectSelf() { this.parentElement.select(this); }
	deactivate() {
		this.style.background = this.theme.primary;
		this.style.color = this.theme.onPrimary;
		this.style.borderBottom = "1px solid rgba(0, 0, 0, 0.3)";
		this.active = false;
		this.dispatchEvent(this.deactivateEvent);
	}
}
customElements.define('tabbed-page-layout', TabbedPageLayout);
customElements.define('tabs-keeper', TabsKeeper);
customElements.define('close-button', CloseButton);
customElements.define('tab-button', TabButton);
