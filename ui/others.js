// Other components
class CollapsibleSections extends ResponsiveElement{}
customElements.define('collapsible-sections', CollapsibleSections);

class DirectoryLayout extends ResponsiveElement{
	// This is for making a directory kind of structure
	// An example of this is available on the explorer section of code editors

}
customElements.define('directory-container', DirectoryLayout);

class SearchComponent extends InputElement{
	constructor(){}
}
customElements.define('search-component', SearchComponent);


class OverlayComponent extends Element{
	constructor(){
		super();
		this.blurTarget = null;
	}
	connectedCallback(){
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
	addBlurTarget(target){
		this.blurTarget = target;
	}
	setActive(object = null){
		this.hidden = false;
		this.style.display = "flex";
		this.blurTarget.style.filter = "blur(3pt)";
		if(object) this.innerHTML = object;
	}
	setInactive(){
		try{
			this.blurTarget.style.filter = "none";
		}catch(e){console.warn(e);}
		this.innerHTML = "No content";
		this.hidden = true;
		this.style.display = "none";
	}
}
customElements.define('overlay-component', OverlayComponent);

// customElements.define('', );
