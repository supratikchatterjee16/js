
// Icons
const _closeIcon = '<svg height="10" width="10" pointer-events="none"><path d="M0 0 L10 10 M10 0 L0 10 Z" stroke="#334433" stroke-width="2"/></svg>',
	_infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><defs><style>.a{fill:#9b9b9b;}</style></defs><path class="a" d="M9.75,14.25h1.5V9.75H9.75ZM10.5,3A7.5,7.5,0,1,0,18,10.5,7.5,7.5,0,0,0,10.5,3Zm0,13.5a6,6,0,1,1,6-6A6.008,6.008,0,0,1,10.5,16.5ZM9.75,8.25h1.5V6.75H9.75Z" transform="translate(-3 -3)"/></svg>',
	_refreshIcon = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14.991\" height=\"15\" viewBox=\"0 0 14.991 15\"><defs><style>.a{fill:#faa51a;}</style></defs><path class=\"a\" d=\"M18.8,8.2a7.5,7.5,0,1,0,1.95,7.172H18.8a5.622,5.622,0,1,1-5.3-7.5,5.545,5.545,0,0,1,3.956,1.669l-3.019,3.019h6.563V6Z\" transform=\"translate(-6.015 -6)\"/></svg>',
	_downArrowIcon = '',
	_sortIcon = '',
	_sortAlphaIcon = '',
	_sortNumeroIcon = '',
	_searchIcon = '';
 

    
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
