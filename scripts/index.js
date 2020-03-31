import {convertMillisecondsToDate, timeLeftInMilliseconds,checkFutureDate} from "./dateTimeHelper.js";
import {checkPermission, notify} from "./notification.js";
import {updateUI, clearInputData} from "./uiManager.js";
import {SHOW_FORM_BUTTON, CREATE_EVENT_BLOCK,CREATE_EVENT_BUTTON, DATE_TIME_INPUT, EVENT_MESSAGE_INPUT, FORM_CONTAINER, TIME_LEFT_BLOCK } from "./constants.js";

SHOW_FORM_BUTTON.addEventListener("click", showForm);
CREATE_EVENT_BUTTON.addEventListener("click", startCountdown);

function showForm() {
    FORM_CONTAINER.style.display = "flex";
    CREATE_EVENT_BLOCK.style.display = "none";
}

function startCountdown() {
    let promptInfo = {};
    checkPermission();
    let date = DATE_TIME_INPUT.value;
    promptInfo.eventDate = new Date(date);
    promptInfo.eventMessage = EVENT_MESSAGE_INPUT.value;
    if (date === "" || promptInfo.eventMessage === "") {
        alert("Please fill in the form!")
    } else  if(checkFutureDate(promptInfo.eventDate)) {
        alert("Please select the date for the event in the future");
    } else {
        let timeInterval = setInterval(function () {
            let time = convertMillisecondsToDate(timeLeftInMilliseconds(promptInfo.eventDate));
            JSON.stringify(time);
            if (!(time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0)) {
                updateUI(time);
                CREATE_EVENT_BLOCK.style.display = "none";
                FORM_CONTAINER.style.display = "none";
                TIME_LEFT_BLOCK.style.display = "flex";
            } else {
                updateUI(time);
                TIME_LEFT_BLOCK.style.display = "none";
                FORM_CONTAINER.style.display = "none";
                CREATE_EVENT_BLOCK.style.display = "flex";
                clearInputData();
                clearInterval(timeInterval);
                notify(promptInfo.eventMessage);
            }
        }, 500);
    }
}

