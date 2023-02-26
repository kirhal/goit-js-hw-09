import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtnEl = document.querySelector('button');
const secondsValueEl = document.querySelector('span[data-seconds]');
const minutesValueEl = document.querySelector('span[data-minutes]');
const hoursValueEl = document.querySelector('span[data-hours]');
const daysValueEl = document.querySelector('span[data-days]');
const pickerDateEl = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      return alert('Please choose a date in the future');
    }

    setInterval(() => {
      const currentTime = Date.now();
      const resultTime = selectedDates[0] - currentTime;
      const convertedTime = convertMs(resultTime);
      secondsValueEl.textContent = convertedTime.seconds;
      minutesValueEl.textContent = convertedTime.minutes;
      hoursValueEl.textContent = convertedTime.hours;
      daysValueEl.textContent = convertedTime.days;
    }, 1000);
  },

  // onOpen(selectedDates) {},
};

flatpickr('#datetime-picker', options);

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

function addLeadingZero(value) {
  padStart();
}
