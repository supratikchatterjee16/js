
// Table element to make use of concept provided by
// Henil Mistry(Designer, TCS)
// Using pandas.DataFrame.to_json(orient='records'),
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

class TableContainer extends ResponsiveElement{
  constructor(){
    super();
    this._data = [];
    this.table = document.createElement('table');
    this.title_pane = document.createElement('table-title');
    this.refreshEvennt = new Event('refresh');
    this._thead = document.createElement('thead');
    this._tbody = document.createElement('tbody');
    this._currentData = [];
    this._sortIndex = '';
    this._dataframe = null;
  }
  set data(_data){
    this._data = _data;
    this._dataframe = DataFrame.from_json(_data);
    // console.log(this._dataframe.get_distict());
    this.remake();
  }
  /**
  * Function for displaying data passed onto the tbody after processing
  *
  * @author Supratik Chatterjee
  */
  refresh_body(data){
    this._tbody.innerHTML = "";
    this._currentData = data;
    if(data.length == 0)return;
    let headers = Array.from(Object.keys(data[0]));
    data.forEach((val) => {
      let tr = document.createElement('tr');
      headers.forEach((hval) => {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(val[hval]));
        tr.appendChild(td);
      });
      this._tbody.appendChild(tr);
    });
    if(!this.table.contains(this._tbody))this.table.appendChild(this._tbody);
  }

  /**
  * Function to create the entire table from scratch.
  * Required
  */
  remake(){
    let headers = Array.from(Object.keys(this._data[0]));
    this.table.innerHTML = '';

    let title_row = document.createElement('tr');
    headers.forEach((val) => {
      let th = document.createElement("th");
      let title = document.createTextNode(val);
      th.appendChild(title);
      th.name = val;
      th.onclick = function(event){
        let key = event.target.name;
        let parentTable = event.target.parentElement.parentElement.parentElement.parentElement;
        let data = parentTable._currentData;
        if(parentTable._sortIndex == key) data.reverse();
        else data.sort((elem1, elem2) => {return elem1[key].localeCompare(elem2[key]);});
        parentTable._sortIndex = key;
        parentTable.refresh_body(data);
      };
      title_row.appendChild(th);
    });

    let filter_row = document.createElement('tr');
    headers.forEach((val) => {
      let filter = null;
      console.log(this._dataframe.dtype[val][1]);
      switch(this._dataframe.dtype[val][1]){
        case 'categorical' : ;// fall through casing
        case 'discrete' : {
          filter = document.createElement('select');
          filter.style.width = "90%";
          filter.name = val;
          let distinct_vals = this._dataframe.getDistinct([val])[0];
          let option = document.createElement('option');
          option.innerHTML = '';
          filter.appendChild(option);
          distinct_vals.forEach((val) => {
            option = document.createElement('option');
            option.innerHTML = val;
            filter.appendChild(option);
          });
          filter.onchange = function(event){
            let key = event.target.name;
            let value = event.target.value;
            let parentTable = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
            let filtered_data = parentTable._data.filter((obj) => {
              let re = new RegExp(value);
              return re.test(obj[key]);
            });
            // console.log(filtered_data);
            parentTable.refresh_body(filtered_data);
          };
        }; break;
        default : {
          filter = document.createElement('input');
          filter.style.width = "90%";
          filter.name = val;
          filter.type = 'text';
          filter.onkeyup = function(event){
            let key = event.target.name;
            let value = event.target.value;
            let parentTable = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
            let filtered_data = parentTable._data.filter((obj) => {
              let re = new RegExp(value);
              return re.test(obj[key]);
            });
            // console.log(filtered_data);
            parentTable.refresh_body(filtered_data);
          };
        }; break;
      }

      // filter.style.marginLeft = "5pt";
      // filter.style.marginRight = "5pt";
      let td = document.createElement('td');
      td.appendChild(filter);
      filter_row.appendChild(td);
    });
    this._thead.appendChild(title_row);
    this._thead.appendChild(filter_row);
    if(!this.table.contains(this._thead))this.table.appendChild(this._thead);
    this.refresh_body(this._data);
  }
  connectedCallback(){
    this.style.display =  "block";
    this.style.overflow = "auto";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.scrollbarWidth = "none";
    this.style.msScrollbarWidth = "none";
    this.style.border = "thin solid #333";
    if(this.hasAttribute('refresh')){}
    if(this.hasAttribute('auto-refresh')){}
    if(this.hasAttribute('title')){this.title_pane.appendChild(document.createTextNode(this.title));}
    this.innerHTML = "";
    this.appendChild(this.title_pane);
    this.appendChild(this.table);
    // this.table.appendChild(this._thead);
    // this.table.appendChild(this._tbody);
  }
}

class TableTitle extends ResponsiveElement{
  constructor(){super();}
  connectedCallback(){
    this.style.display =  "block";
    this.style.position = "sticky";
    this.style.top = "0";
    this.style.left = "0";
    this.style.right = "0";
    this.style.padding = "5pt";
    this.style.paddingLeft = "10pt";
    this.style.overflow = "auto";
    // this.style.width = "99%";
    this.style.background = "#333";
    this.style.color = "white";
    this.style.fontVariant = "small-caps";
  }
}

customElements.define('table-container', TableContainer);
customElements.define('table-title', TableTitle);
