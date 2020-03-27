import {promptInfo} from "./variables.js";

export function checkPermission() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here

        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here

                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

export function notify() {
    let notify = new Notification('Your event', {
        body: `${promptInfo.eventMessage}`,
        icon: "https://getdrawings.com/free-icon/ufo-icon-57.png",
    });
    setTimeout(notify.close.bind(notify),7000);
}