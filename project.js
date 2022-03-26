let form = document.querySelector("form");
let input = document.querySelector("input");
let clearbtn = document.querySelector("#clear-btn");
let alartArea = document.querySelector("#alart-area");
let tasksemptydiv = document.querySelector(".tasks-empty");
let list = document.querySelector(".list");



//  pop up notfication

window.onload = function () {
	input.focus();




	if (localStorage) {
		for (var i = 0; i < localStorage.length; i++) {
			let listitem = document.createElement("li");
			listitem.classList.add("list-item");



			listitem.innerHTML = `
<span class ="task">${(localStorage.getItem(localStorage.key(i)))}</span>
<span onclick="deletetask(event)" class ="del"> X </span>
`

			list.appendChild(listitem);
			input.value = ""
			input.focus()
			tasksempty()
			curenttasks(list.children.length)


		}
		let delbtns = document.querySelectorAll(".del")

		delbtns.forEach(btn => {
			btn.onclick = deletetask;
		})
		let taskdone = document.querySelectorAll(".list-item");
		taskdone.forEach(ele => {
			ele.children[0].onclick = make;
		})
	}
	
}





tasksempty();

form.onsubmit = newTask;

clearbtn.onclick = cleartasks;
var val = 0;
function newTask(e) {

	val++;
	e.preventDefault()

	if (input.value === "") {
		alartArea.innerHTML = `<div class="n-val"> 
Enter Task !
</div>`;

		setTimeout(() => {
			let nval = document.querySelector(".n-val");
			nval.style.height = 0;
			nval.style.padding = 0;
			setTimeout(() => { nval.remove() }, 1000)


		}, 1000)

	}
	else {
		//add task
		let listitem = document.createElement("li");
		listitem.classList.add("list-item");

		let inputcap = input.value.substr(0, 1).toUpperCase() + input.value.substr(1, input.value.
			length);
		localStorage.setItem(`${inputcap}`, inputcap);


		listitem.innerHTML = `
<span class ="task">${inputcap}</span>
<span onclick="deletetask(event)" class ="del"> X </span>
`

		list.appendChild(listitem);
		input.value = ""
		input.focus()
		tasksempty()
		curenttasks(list.children.length)

		//delete task

		let delbtns = document.querySelectorAll(".del")

		delbtns.forEach(btn => {
			btn.onclick = deletetask;
		})

		let taskdone = document.querySelectorAll(".list-item");
		taskdone.forEach(ele => {
			ele.children[0].onclick = make;
		})

		setTimeout(() => { var notify = {
			type: 'basic',
			iconUrl: 'pop128.png',
			title: 'adding',
			message: 'you added new task '
		};
		chrome.notifications.create(notify, callback);
	function callback(){
		console.log("add task");
	} }, 500)

	}
	
}

function deletetask(e) {
	localStorage.removeItem(e.target.parentNode.firstElementChild.textContent);
	e.target.parentNode.remove();
	tasksempty();
	curenttasks(list.children.length)
	donetasks()

	//---------
	
	deltask ();

}

function cleartasks() {
	localStorage.clear();
	list.innerHTML = ""
	tasksempty()
	curenttasks(list.children.length)
	donetasks()

}

function tasksempty() {
	if (list.children.length === 0) {
		tasksemptydiv.innerHTML = "tasks empty"
	}
	else {
		tasksemptydiv.innerHTML = ""

	}
}

function make(e) {
	e.target.classList.toggle("done");
	donetasks()
}


function curenttasks(count) {
	document.querySelector(".curnt").innerHTML = count;

}


function donetasks() {
	let donelenght = document.querySelectorAll(".done").length;
	document.querySelector(".doone").innerHTML = donelenght;
}

// notification
function deltask (){
	var noti = {
		type: 'basic',
		iconUrl: 'pop128.png',
		title: 'removing',
		message: 'you just remove a task'
	};
	chrome.notifications.create(noti, callback);
function callback(){
	console.log("re task");
}
}
function addtask (){
	var notify = {
		type: 'basic',
		iconUrl: 'pop128.png',
		title: 'adding',
		message: 'you added new task '
	};
	chrome.notifications.create(notify, callback);
function callback(){
	console.log("add task");
}
}
