import {isValidDate, convertMillisecondsToDate, timeLeftInMilliseconds} from "./dateTimeHelper.js";
import {checkPermission, notify} from "./notification.js";

export function showPrompt(){
    let promptInfo = {};
    let date = window.prompt("Please enter the date and the time for the event with format mm-dd-yyyy hh:mm").toString();
    while (!isValidDate(date)){
        date = window.prompt("Please enter the valid date and the time with format mm-dd-yyyy hh:mm").toString();
}
    promptInfo.eventDate = new Date(date);
    promptInfo.eventMessage = window.prompt("Please enter the message for the event").toString();
    checkPermission();
    startCountdown(promptInfo);
}


function startCountdown(promptInfo) {
    let timeInterval = setInterval(function () {
        let time = convertMillisecondsToDate(timeLeftInMilliseconds(promptInfo.eventDate));
        JSON.stringify(time);
        if (!(time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0)) {
            updateUI(time);
            document.getElementById("create-block").style.display = "none";
            document.getElementById("remaining-time").style.display = "flex";
        } else {
            updateUI(time);
            document.getElementById("remaining-time").style.display = "none";
            document.getElementById("create-block").style.display = "flex";
            clearInterval(timeInterval);
            notify(promptInfo.eventMessage);
        }
    }, 500);
}

function updateUI(time){
    document.getElementById("days-left-label").innerHTML = JSON.stringify(time.days);
    document.getElementById("hours-left-label").innerHTML = JSON.stringify(time.hours);
    document.getElementById("minutes-left-label").innerHTML = JSON.stringify(time.minutes);
    document.getElementById("seconds-left-label").innerHTML = JSON.stringify(time.seconds);
}

window.showPrompt = showPrompt;