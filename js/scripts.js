//Elements
const input = document.getElementById("input");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const myClock = document.getElementById("clockDisplay");

//Time of TO Do List
function renderTime() {
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    if (h == 24) {
        h = 0;
    } else if (h > 12) {
        h = h - 0;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    var myClock = document.getElementById("clockDisplay");
    myClock.textContent = "" + h + ":" + m;

    setTimeout("renderTime()", 1000);

}
renderTime();


//Date of To Do List  
let options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Variables
let LIST = [],
    id = 0;


list.addEventListener("click", function(event) {
    let element = event.target;
    const elementJob = event.target.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);

    } else if (elementJob == "delete") {
        removeToDo(element);

    }
    // Add local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));


});


// Class names
const CHECK = "fa-check-circle";

const UNCHECK = "fa-circle-thin";

const LINE_THROUGH = "lineThrough";


// Add a to do function
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;

    const LINE = done ? LINE_THROUGH : "";

    const item = `<li style="display: flex; justify-content: space-between;" class="item">
                    <i class="fa ${DONE} fa-1.5x" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    
                    <br>
                    <i style="color: #E75480;" class="fa fa-trash-o fa-1.5x" job="delete" id="${id}"></i>
                  </li>
                  `;


    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

// Check if task is complete
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// Remove if task is complete
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// Add a task when enter key is pressed
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // Add local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";

    }
});

// retrieve item from local storage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);

    });
}