var gl_words = {};

/**
 * Read operation. Required special handling, due to Promises
 */
function get_all() {
    opts = {}
    opts['method'] = 'GET';
    fetch('https://incubytecrud.herokuapp.com/words', opts).then((response) => {
        if (response.status == 200)
            return response.json();
    }).then((data) => {
        gl_words = data;
        console.log(data);
        filter(null);
    });
}

/**
 * Initialization function for environment.
 */
function init() { get_all(); }

/**
 * Fetch API abstraction for sending messages to REST endpoint
 * @param {String} method 
 * @param {Object} json 
 */
function send(method, json) {
    opts = {}
    opts['method'] = method;
    if (json != null){
        opts['body'] = JSON.stringify(json)
        opts['headers'] = {'Content-Type' : "application/json"};
    }
        
    fetch('https://incubytecrud.herokuapp.com/words', opts).then((response) => {
        alert(response.status);
        if (response.status == 200)
            get_all();
        else
            alert("Failed to update.\nStatus code : " + response.status);
    });
}

function show_words(arr){
    document.getElementById('words').innerHTML = '';
    arr.forEach((word) => {
        let elem = document.createElement('word');
        elem.innerText = word;
        elem.onclick = select;
        document.getElementById('words').appendChild(elem);
    });
}

/**
 * Filteration of words received from DB
 */
function filter(e) {// if element size is 1 set changed enabled
    let val = '';
    if (e != null) {
        if (e instanceof Event) {
            let elem = e.target;
            val = elem.value;
            console.log(elem.value);
        }
        else
            val = e;
    }
    console.log(val);
    console.log(gl_words);
    filtered_word_list = []
    gl_words['data'].forEach((tuple) => {
        let word = tuple[1];
        if(val != null && val.length > 0 ){
            if(word.includes(val))
                filtered_word_list.push(word);
        }
        else
            filtered_word_list.push(word);
    });
    show_words(filtered_word_list);
    if (filtered_word_list.length == 1){
        document.getElementById('changed').disabled = false;
        document.getElementById('btn_del').disabled = false;
    }
    else{
        document.getElementById('changed').disabled = true;
        document.getElementById('btn_del').disabled = true;
    }
}

/**
 * Add or Update word
 * @param {Event} e 
 * @returns 
 */
function make_call(e) {// if changed is enabled set to modification
    e.preventDefault();
    let body = {};
    let word = document.getElementById("word").value;
    let changed = document.getElementById('changed').value;
    let method = 'POST';
    if (word != null)
        body['word'] = word;
    if (changed != null && changed.length > 0) {
        body['changed'] = changed;
        method = 'PUT';
    }

    console.log(method);
    console.log(body);
    send(method, body);

    // clear fields
    document.getElementById('word').value = '';
    document.getElementById('changed').value = '';
    document.getElementById('changed').disabled = true;
    return false;
}

/**
 * Delete Word
 * @param {Event} e 
 * @returns 
 */
function delete_word(e){
    e.preventDefault();
    let body = {};
    let word = document.getElementById("word").value;
    if (word != null)
        body['word'] = word;
    send("DELETE", body);
    return false;
}

/**
 * Select a word enabling the modification and deletion functions
 * @param {Event} e 
 */
function select(e) {
    let val = e.target.innerText;
    console.log(val);
    document.getElementById('word').value = val;
    document.getElementById('btn_del').disabled = false;
    document.getElementById('changed').disabled = false;
}
