import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtnEl = document.querySelector('button');
const secondsValueEl = document.querySelector('span[data-seconds]');
const minutesValueEl = document.querySelector('span[data-minutes]');
const hoursValueEl = document.querySelector('span[data-hours]');
const daysValueEl = document.querySelector('span[data-days]');
let selectedDate = 0;

startBtnEl.setAttribute('disabled', true);
startBtnEl.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startBtnEl.setAttribute('disabled', true);
      return alert('Please choose a date in the future');
    }
    startBtnEl.removeAttribute('disabled');
    selectedDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartBtnClick(e) {
  setInterval(() => {
    const currentTime = Date.now();
    const resultTime = selectedDate - currentTime;
    const { days, hours, minutes, seconds } = (convertedTime =
      convertMs(resultTime));
    secondsValueEl.textContent = seconds;
    minutesValueEl.textContent = minutes;
    hoursValueEl.textContent = hours;
    daysValueEl.textContent = days;
    console.log(`${days}:${hours}:${minutes}:${seconds}`);
  }, 1000);
}
