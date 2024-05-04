import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDatePicker = document.querySelector('input#datetime-picker');
const datePickerButton = document.querySelector('button[data-start]');
const dateDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinuts = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

datePickerButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const selectedDatesnow = Date.now();
    if (selectedDate < selectedDatesnow) {
      Notify.failure('Please select future date.');
      datePickerButton.disabled = true;
      return;
    }
    datePickerButton.disabled = false;
    let intervalID = null;
    datePickerButton.addEventListener('click', startbutton);
    function startbutton() {
      datePickerButton.disabled = true;
      inputDatePicker.disabled = true;

      intervalID = setInterval(() => {
        const currentTime = Date.now();
        if (selectedDate < currentTime) {
          clearInterval(intervalID);
          inputDatePicker.disabled = false;
          return;
        }

        const timesdifference = selectedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(timesdifference);
        dateDays.textContent = addLeadingZeros(days);
        dataHours.textContent = addLeadingZeros(hours);
        dataMinuts.textContent = addLeadingZeros(minutes);
        dataSeconds.textContent = addLeadingZeros(seconds);
      });
    }
  },
};

flatpickr(inputDatePicker, options);

function addLeadingZeros(value) {
  return String(value).padStart(2, '0');
}
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
