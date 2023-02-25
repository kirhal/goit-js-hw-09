const bodyEl = document.querySelector('body');
const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
let bodyHexColor = null;

startButtonEl.addEventListener('click', onStartBtnClick);
stopButtonEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  startButtonEl.setAttribute('disabled', true);
  stopButtonEl.removeAttribute('disabled');
  bodyHexColor = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick(e) {
  stopButtonEl.setAttribute('disabled', true);
  startButtonEl.removeAttribute('disabled');
  clearInterval(bodyHexColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
