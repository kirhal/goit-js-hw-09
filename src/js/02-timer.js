import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  fontSize: '20px',
  width: '400px',
  position: 'center-top',
});

const startBtnEl = document.querySelector('button[data-start]');
const secondsValueEl = document.querySelector('span[data-seconds]');
const minutesValueEl = document.querySelector('span[data-minutes]');
const hoursValueEl = document.querySelector('span[data-hours]');
const daysValueEl = document.querySelector('span[data-days]');

const timer = {
  intervalFn: null,
  selectedDate: null,
  isActive: false,
  resultTime: null,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalFn = setInterval(() => {
      const currentTime = Date.now();
      this.resultTime = this.selectedDate - currentTime;
      if (this.resultTime > 0) {
        const { days, hours, minutes, seconds } = convertMs(this.resultTime);
        secondsValueEl.textContent = seconds;
        minutesValueEl.textContent = minutes;
        hoursValueEl.textContent = hours;
        66;
        daysValueEl.textContent = days;
      } else {
        this.stop();
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalFn);
    this.isActive = false;
  },
};

const options = {
  enableSeconds: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startBtnEl.setAttribute('disabled', true);
      return Notify.failure(' ⚠ Please choose a date in the future');
    } else if (timer.selectedDate) {
      return;
    } else {
      startBtnEl.removeAttribute('disabled');
      timer.selectedDate = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);

startBtnEl.setAttribute('disabled', true);
startBtnEl.addEventListener('click', () => {
  timer.start();
});

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
