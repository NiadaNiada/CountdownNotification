import {DATE_TIME_INPUT, EVENT_MESSAGE_INPUT} from "./constants.js";

export function clearInputData() {
    DATE_TIME_INPUT.value = "";
    EVENT_MESSAGE_INPUT.value = "";
}

export function updateUI(time){
    document.getElementById("days-left-label").innerHTML = JSON.stringify(time.days);
    document.getElementById("hours-left-label").innerHTML = JSON.stringify(time.hours);
    document.getElementById("minutes-left-label").innerHTML = JSON.stringify(time.minutes);
    document.getElementById("seconds-left-label").innerHTML = JSON.stringify(time.seconds);
}