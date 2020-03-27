import {promptInfo} from "./variables.js";

export function isValidDate(str) {

    // mm-dd-yyyy hh:mm:ss

    let regex = /(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})\s*(\d{0,2}):?(\d{0,2}):?(\d{0,2})/,
        parts = regex.exec(str);

    if (parts) {
        let date = new Date ( (+parts[3]), (+parts[1])-1, (+parts[2]), (+parts[4]), (+parts[5]), (+parts[6]) );
        if ( ( date.getDate() == parts[2] ) && ( date.getMonth() == parts[1]-1 ) && ( date.getFullYear() == parts[3] ) ) {
            return date;
        }
    }
    return false;
}

export function convertMillisecondsToDate( milliSeconds ){

    let milliseconds, days, hours, minutes, seconds;

    if( milliSeconds >= 0 ){

        milliseconds = milliSeconds;
        days   = Math.floor( milliseconds / ( 24 * 60 * 60 * 1000 ) );
        if ( days < 0 ) { days = 0; }
        milliseconds  -= days * 24 * 60 * 60 * 1000;

        hours   = Math.floor( milliseconds / ( 60 * 60 * 1000 ) );
        if ( hours < 0 ) { hours = 0; }
        milliseconds  -= hours * 60 * 60 * 1000;

        minutes  = Math.floor( milliseconds / ( 60 * 1000 ) );
        if ( minutes < 0 ) { minutes = 0; }
        milliseconds  -= minutes * 60 * 1000;

        seconds  = Math.floor( milliseconds / ( 1000 ) );
        if ( seconds <= 0 ) { seconds = 0; }

    }else{
        days = hours = minutes = seconds = 0;
    }

    return {days,hours,minutes,seconds};
}

export function timeLeftInMilliseconds() {
    let today = new Date();
    return promptInfo.eventDate.getTime() - today.getTime();
}
