// Plotting elements

// Data format
// https://www.chartjs.org/docs/latest/general/data-structures.html#object
// The link tells us that making using of pandas.DataFrame.to_json(orient='records') is directly implementable
// Data is recieved in the form of :
// [
//     {
//         "col 1": "a",
//         "col 2": "b"
//     },
//     {
//         "col 1": "c",
//         "col 2": "d"
//     }
// ]

// The order in which the componenets are created follow the order as specified in
// https://www.chartjs.org/docs/latest/samples/other-charts/stacked-bar-line.html

class ChartPlot extends Element{
	// Elements integrally tied with ChartJS
	constructor(){
		super();
		this._config = {
			type : null,
			data : {
				labels : [],
				datasets : []
			},
			options : {
				responsive : true,
				plugins : {
					legend : { position : 'top' },
					title : { display : true, text : '' }
				}
			}
		};
		this.canvas = document.createElement("canvas");
		this.datasets = {};
	}
	init(){
		this.style.display = "block";
		this.style.height = "100%";
		this.style.width = "100%";
		this.canvas.height = this.clientHeight;
		this.canvas.width = this.clientWidth;
		this.canvas.style.height = "inherit";
		this.canvas.style.width = "inherit";
		this.appendChild(this.canvas);
		let context = this.canvas.getContext('2d');
		const x = this.canvas.width / 2, y = this.canvas.height / 2;
		context.font = '20px sans-serif';
		context.textAlign = 'center';
		context.fillText('No Data', x, y);
	}
	setTitle(title){this._config['options']['plugins']['title']['text'] = title;}
	addData(label, data){
    this.datasets[label] = data;
  }
	removeData(label){delete this.datasets[label];}
	setLabels(labels){this._config.data.labels = labels;}
}
class BarPlot extends ChartPlot{
	constructor(){
		super();
		this._config.type = 'bar';
		this._config.options['parsing'] = {
			xAxisKey: null,
			yAxisKey: null
		};
	}
	refresh(){
		for (const [k, v] of Object.entries(this.datasets)) {
			let dict = {};
			dict.label = k;
			dict.data = v;
			let hue = getRandomInt(0, 360);
			dict.borderColor = "hsl("+ hue +", 100%, 50%)";
			dict.backgroundColor = "hsla("+ hue +", 100%, 50%, 0.5)";
			this._config.data.datasets.push(dict);
		}
	}
	setXAxis(identifier){this._config.options['parsing']['xAxisKey'] = identifier;}
	setYAxis(identifier){this._config.options['parsing']['yAxisKey'] = identifier;}
	draw(){
		this.refresh();
		// console.log(this._config);
		return new Chart(this.canvas.getContext('2d'), this._config);
	}
	connectedCallback(){
		this.init();
		// console.log(this.getAttribute('horizontal'));
		if(this.hasAttribute('horizontal'))this._config.options['indexAxis'] = 'y';
		if(this.hasAttribute('stacked'))this._config.options['scales'] = {x: {stacked: true}, y: {stacked: true}};
	}
}
class LinePlot extends ChartPlot{
	constructor(){
		super();
		this._config.type = 'line';
    this._config.options.parsing = {};
	}
	refresh(){
    let hues = [];
		for (const [k, v] of Object.entries(this.datasets)) {
			let dict = {};
			dict.label = k;
			dict.data = v;
			let hue = getRandomInt(0, 360);
      hue = getRandomInt(0, 360);
			dict.borderColor = "hsl("+ hue +", 100%, 50%)";
			dict.backgroundColor = "hsla("+ hue +", 100%, 50%, 0.5)";
			this._config.data.datasets.push(dict);
		}
	}
	setXAxis(identifier){
    this._config.options['parsing']['xAxisKey'] = identifier;
  }
	setYAxis(identifier){this._config.options['parsing']['yAxisKey'] = identifier;}
	draw(){
		this.refresh();
		// console.log(this._config);
		return new Chart(this.canvas.getContext('2d'), this._config);
	}
	connectedCallback(){
		this.init();
		if(this.hasAttribute('horizontal'))this._config.options['indexAxis'] = 'y';
	}
}
class BubblePlot extends ChartPlot{}
class ScatterPlot extends ChartPlot{
	constructor(){super();}
	connectedCallback(){
		this.init();
	}
}
class DoughnutPlot extends ChartPlot{}
class PiePlot extends ChartPlot{}
class PolarAreaPlot extends ChartPlot{}
class RadarPlot extends ChartPlot{}
class CustomPlot extends ChartPlot{}

customElements.define('line-plot', LinePlot);
customElements.define('bar-plot', BarPlot);
