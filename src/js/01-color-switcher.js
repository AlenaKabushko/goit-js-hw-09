const startButtonRef = document.querySelector("button[data-start]")
const stopButtonRef = document.querySelector("button[data-stop]")
const bodyRef = document.querySelector("body")
console.log(startButtonRef)
console.log(stopButtonRef)

let intervalID = null;
stopButtonRef.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

function onStartButton(){
    intervalID = setInterval(() => {
        console.log("interval work +++");
        bodyRef.style.backgroundColor = getRandomHexColor();
        startButtonRef.disabled = true;
        stopButtonRef.disabled = false;
    }, 1000)
}

function onStopButton() {
    clearInterval(intervalID);
    console.log("interval DONT work ---");
    startButtonRef.disabled = false;
    stopButtonRef.disabled = true;
}

startButtonRef.setAttribute("style", 
"position: absolute; left: 40%; top: 50%; font-size: 24px; padding: 5px 15px; border-color: #35ff35; cursor: pointer;")
stopButtonRef.setAttribute("style", 
"position: absolute; left: 60%; top: 50%; font-size: 24px; padding: 5px 15px; border-color: #ff2f2f; cursor: pointer;")

startButtonRef.addEventListener("click", onStartButton)
stopButtonRef.addEventListener("click", onStopButton)


