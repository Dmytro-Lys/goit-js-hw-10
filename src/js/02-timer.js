import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/src/notiflix.css";

Notiflix.Notify.init({
    position: 'center-top',
    clickToClose: true,
    timeout: 2000
})

const refs = {
    dateEnd: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector("[data-start]"),
    daysTimer: document.querySelector("[data-days]"),
    hoursTimer: document.querySelector("[data-hours]"),
    minutesTimer: document.querySelector("[data-minutes]"),
    secondsTimer: document.querySelector("[data-seconds]")
}

let timerId = null;
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (new Date() >= selectedDates[0]) {
            refs.btnStart.disabled = true; 
            return Notiflix.Notify.failure("Please choose a date in the future");
        }  
        refs.btnStart.disabled = false;
  },
};

flatpickr(refs.dateEnd, options);

// functions
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function render({ days, hours, minutes, seconds }) {
     refs.daysTimer.textContent = days;
        refs.hoursTimer.textContent = hours;
        refs.minutesTimer.textContent = minutes;
        refs.secondsTimer.textContent = seconds;
}

function endTimer() {
    Notiflix.Notify.info("Time is up"); 
    clearInterval(timerId);
    refs.dateEnd.disabled = false;
}

function timer() {
    const differenceMs = new Date(refs.dateEnd.value) - new Date();
    if (differenceMs <= 0) return endTimer();
    render(convertMs(differenceMs));
}

function startTimer() {
    refs.btnStart.disabled = true;
    if (new Date(refs.dateEnd.value) - new Date() <= 0) return endTimer();
    refs.dateEnd.disabled = true;
    timer();
    timerId = setInterval(timer, 1000)
}

 refs.btnStart.addEventListener("click", startTimer);
