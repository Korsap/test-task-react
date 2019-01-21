export const addLeadingZero = (number) => {
    return number > 9 ? number : `0${number}`;
};

const getAmPm = (hours) => {
    return hours > 12 ? 'PM' : 'AM';
};

const getHoursIn12Format = (hours) => {
    return hours > 12 ? hours - 12 : hours;
};

export const getFormattedDateTime = (timestamp) => {
    const monthsStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateTime = new Date(timestamp);

    const date = `${dateTime.getDate()}/${monthsStrings[dateTime.getMonth()]}/${dateTime.getFullYear().toString().substr(-2)}`;
    const time = `${getHoursIn12Format(dateTime.getHours())}:${addLeadingZero(dateTime.getMinutes())} ${getAmPm(dateTime.getHours())}`;

    return `${date} ${time}`;
};

export const getTimePartsInHMSFormat = (timeParts, withSeconds) => {
    let formattedTime = '';
    if (timeParts.hour) {
        formattedTime += `${timeParts.hour}h `;
    }

    if (timeParts.minute) {
        formattedTime += `${timeParts.minute}m `;
    }

    if (timeParts.secunde && withSeconds) {
        formattedTime += `${timeParts.secunde}s`;
    }

    return formattedTime.trim();
};
