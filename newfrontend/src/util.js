export const translateDate = function (date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dateString = `${(days[date.getDay()])} ${date.getDate()} ${(months[date.getMonth()])} ${date.getFullYear()}`;


    let hours = date.getHours();
    let ampm = "AM";
    if (hours >= 12) {
        ampm = "PM";
        hours -= 12;
    }

    if (hours === 0) {
        hours = 12;
    }

    let mins = date.getMinutes();
    if (mins < 10) {
        mins = "0" + mins.toString();
    }

    const timeString = `${hours}:${mins} ${(ampm)}`;
    return [dateString, timeString];
}
