
class BasicButton extends Element{
	constructor(){
		super();
	}
	connectedCallback(){
		this.style.display = "inline-block";
		this.style.padding = "5px";
		this.style.paddingLeft = "20pt";
		this.style.paddingRight = "20pt";
		this.style.border = "thin solid black";
		this.style.borderRadius = "5%";
		this.theme = this.parentNode.theme;
		this.style.color = this.theme.onPrimary;
		this.style.borderColor = this.style.color;
		this.addEventListener('mouseenter', function(){this.style.background = "black"; this.style.color = "white";});
		this.addEventListener('mouseleave', function(){this.style.background = "rgba(0, 0, 0, 0)"; this.style.color = this.theme.onPrimary;});
		// this.style.boxShadow = "0px 5px 20px rgba(0, 0, 0, 0.2)";

	}
	disconnectedCallback(){}
	static get observedAttributes(){}
	attributeChangedCallback(name, before, after){}
	toString(){return "[object BasicButton]";}
}
customElements.define('button-basic', BasicButton);

class LinkButton extends Element{
  constructor(){
		super();
	}
	static get observedAttributes(){// required for attributeChangedCallback
		return ['text-decoration'];
	}
	connectedCallback(){
		this.style.display = "inline-block";
		// console.log(typeof this.getAttribute('hidden'));
		if(this.hasAttribute('hidden')){
			let attribVal = this.getAttribute('hidden');
			if(attribVal.length == 0) this.setAttribute('hidden', 'true');
			else if(attribVal === "true") this.style.display = "none";
		}

		this.style.padding = "5pt";
		// this.style.paddingLeft = "5pt";
		// this.style.paddingRight = "10pt";
		// this.style.border = "thin solid black";
		// this.style.borderRadius = "5%";
		this.theme = this.parentNode.theme;
		this.style.color = this.theme.onPrimary;
		this.style.borderColor = this.style.color;
		this.style.textDecoration = (this.getAttribute('text-decoration'))? this.getAttribute('text-decoration') : "underline";
		this.style.cursor = "pointer";
		// this.addEventListener('mouseenter', function(){this.style.background = "black"; this.style.color = "white";});
		// this.addEventListener('mouseleave', function(){this.style.background = "rgba(0, 0, 0, 0)"; this.style.color = this.theme.onPrimary;});
		// this.style.boxShadow = "0px 5px 20px rgba(0, 0, 0, 0.2)";

	}
	disconnectedCallback(){}
	static get observedAttributes(){return ['hidden'];}
	attributeChangedCallback(name, before, after){
		switch(name){
			case "hidden" : if(after === "true") this.style.display = "none"; else this.style.display = "inline-block"; break;
		}
	}
	toString(){return "[object LinkButton]";}
}

customElements.define('button-link', LinkButton);
