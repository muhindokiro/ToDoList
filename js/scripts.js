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