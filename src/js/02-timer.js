import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputRef: document.querySelector("#datetime-picker"),
    buttonStartRef: document.querySelector("[data-start]"),
    timerRef: document.querySelector(".timer"),
    fieldsRef: document.querySelectorAll(".field"),
    valueDaysRef: document.querySelector("[data-days]"),
    valueHoursRef: document.querySelector("[data-hours]"),
    valueMinutesRef: document.querySelector("[data-minutes]"),
    valueSecondsRef: document.querySelector("[data-seconds]"),
};

console.dir(refs);

let intervalID = null;

refs.buttonStartRef.disabled = true;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    // --------------проверка на дату в будущем---------------------
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] < options.defaultDate) {
            console.log("kapec");
            Notify.failure("Please choose a date in the future");
            return;
        } else {
            refs.buttonStartRef.disabled = false;
            console.log(options.defaultDate);            
        }

// -----------padstart-----------------------------
        function addLeadingZero(value) {
            return String(value).padStart(2, "0")
        };


        // ----------------после нажатия кнопки--------------------
        function onButtonClick() {
            console.log("click");
            
            intervalID = setInterval(() => {
                console.log("interval work") 
                refs.buttonStartRef.disabled = true;
                const timeUnixLeft = selectedDates[0].getTime() - (new Date().getTime())
                const timeLeft = convertMs(timeUnixLeft) 
                console.log(timeLeft)
                //---------------------вывод значений ----------------

                refs.valueDaysRef.textContent = addLeadingZero(timeLeft.days);
                refs.valueHoursRef.textContent = addLeadingZero(timeLeft.hours);
                refs.valueMinutesRef.textContent = addLeadingZero(timeLeft.minutes);
                refs.valueSecondsRef.textContent = addLeadingZero(timeLeft.seconds);

            // ---------обнулить-----------
                if (timeLeft.days === 0 &&
                    timeLeft.hours === 0 &&
                    timeLeft.minutes === 0 &&
                    timeLeft.seconds === 0) {
                    console.log("clear")
                    clearInterval(intervalID);
                    Notify.success("Time to go!");
                };
            }, 1000
            );
        }
        refs.buttonStartRef.addEventListener("click", onButtonClick)
    },
};

refs.buttonStartRef.setAttribute("style", 
"display: block; padding: 20px; width: 200px; font-size: 20px; background-color: #ffd700; border: none; margin: 0 auto 15px auto;")

refs.inputRef.setAttribute("style", 
"display: block;  padding: 20px 15px; text-align: center; font-size: 20px; background-color: #0057b8; width: 200px; margin: 0 auto; border: none;")

refs.timerRef.setAttribute("style", 
"display: flex; flex-direction: row; align-items: center; justify-content: center;")

refs.fieldsRef.forEach((field) => field.setAttribute("style", 
"display: flex; flex-direction: column; align-items: center;  padding: 5px 15px; font-size: 36px;"))

flatpickr("#datetime-picker", options);

