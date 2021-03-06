/*!
 * Conceivilize File Transfer Online Lib
 * @copyright 2022-2025 Supratik Chatterjee
 * @license AGPL
 */

/**
* This function is a utility function for printing debug messages.
* @author Supratik Chattejee
*/
function print(message){
	let target = document.getElementById("output");
	let span = document.createElement('span');
	span.style.display = "block";
	span.innerText = message;
	target.appendChild(span);
}

/** WebSockets uploader class.
 * 
 * This class maintains the websocket port provided to it to send and receive large files,
 * while reducing the overhead.
 * 
 * @author Supratik Chatterjee
 * @constructor transfer_bucket_size, x
 */
class WSUploader{
	constructor(transfer_bucket_size, x){
		this.ws_socket = new WebSocket('{{ws_server_url}}');
		this.ws_socket.onmessage = function(event){
			let message = event.data;
			if(message == '1')
				this.ws_uploader.upload_part(this.ws_uploader.current_part + 1);
			else if(message == '0')
				print('Complete');
		};
		this.ws_socket.onopen = function(_evt){
			this.ws_uploader.is_open = true;
		};
		this.transfer_bucket_capacity = transfer_bucket_size;
		this.x = x;
		this.max_part_size = transfer_bucket_size - x.length;

		this.current_file = null;
		this.current_part = null;
		this.total_parts = null;

		this.is_open = false;
		this.ws_socket.ws_uploader = this;
	}
	upload_part(part_index=0){
		this.current_part = part_index;
		console.log("Uploading part : ", part_index);
		let blob = new Blob([this.x, this.current_file.slice(part_index * this.max_part_size, (part_index + 1) * this.max_part_size)]);
		if(this.is_open)
			this.ws_socket.send(blob);
			// this.ws_socket.send(this.current_file);
		else
			this.ws_socket.onopen = function(event){
				this.ws_uploader.is_open = true;
				this.ws_uploader.upload_part();
			};
	}
	upload(file){
		this.current_file = file;
		this.current_part = 0;
		this.total_parts = Math.trunc(file.size / this.max_part_size);
		this.upload_part();
	}
}
class FileUploader{
	constructor(){
		this.files = [];
		this.is_working = false;
		this.zipper = new JSZip();
	}
	upload(n){
		let file = this.files[n];
		let instance = this;
		console.log('Uploading : ', file.name);
		let file_info = {
			"name" : file.name,
			"last_modified" : file.lastModified,
			"size" : file.size,
			"type" : file.type
		};
		fetch('/store_details',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(file_info)
		}).then(
			(res) => res.json().then(
				(json) => {
					let uploader =  new WSUploader(json['transfer_bucket_capacity'], json['x']);
					uploader.upload(file);
					if(n < instance.files.length - 1)
						instance.upload(n + 1);
				}
			)
		);
	}
	zip(n){
		if(n  >= (this.files.length - 1)){
			this.zipper.generateAsync({type:'blob', compression : 'deflate'}).then((zip) => {
				zip.name = "conception" + Date() + ".zip";
				zip.lastModified = (+ new Date());
				console.log(zip.type);
				this.upload(zip);
			});
			this.working = false;
			return;
		}
		let file = this.files[n];
		let fileReader = new FileReader();
		fileReader.onload = function(_evt){
			let arrayBuffer = this.result;
			let instance = FileUploader.instance;
			instance.zipper.file(file.name, arrayBuffer);
			instance.zip(n + 1);
		};
		print('zipping '+ (n + 1) + '/' + this.files.length);
		console.log(file);
		fileReader.readAsArrayBuffer(file);
	}
	trigger_zipping(){
		// Apply UI updates here

		// Primary logic
		if(!this.is_working)
			return new Promise(resolve => {
				this.zip(0);
				return resolve();
			});
	}
	trigger_upload(){
		if(!this.is_working)
			return new Promise(resolve => {
				this.upload(0);
				return resolve();
			});
	}
	static queue_files(input){
		let instance = FileUploader.instance;
		for(let i= 0; i < input.files.length; i++)
			instance.files.push(input.files[i]);

		// instance.trigger_zipping();
		instance.trigger_upload();
	}
}
FileUploader.instance = new FileUploader();
