function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const background = document.querySelector('body');
const start_btn = document.querySelector('button[data-start]');
const stop_btn = document.querySelector('button[data-stop]');

let backgroundcolor = null;
stop_btn.disabled = true;

function startcolorchange() {
  backgroundcolor = setInterval(() => {
    background.style.backgroundColor = getRandomHexColor();
    stop_btn.disabled = false;
    start_btn.disabled = true;
  }, 1000);
}

function stopcolorchange() {
  clearInterval(backgroundcolor);
  stop_btn.disabled = true;
  start_btn.disabled = false;
}
start_btn.addEventListener('click', startcolorchange);
stop_btn.addEventListener('click', stopcolorchange);
