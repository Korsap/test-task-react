import {
    localStorageSetItem,
    localStorageGetItem,
    localStorageRemoveItem,
} from '../services/localStorage';

const getTimerName = (issueId) => {
    return `timers.${issueId}`;
};

export const setTimerToLocalStorage = (timerData) => {
    localStorageSetItem(getTimerName(timerData.issueId), timerData);
};

export const removeTimerFromLocalStorage = (issueId) => {
    localStorageRemoveItem(getTimerName(issueId));
};

export const getTimerFromLocalStorage = (issueId) => {
    return localStorageGetItem(getTimerName(issueId));
};

export const getAllTimersFromLocalStorage = () => {
    const allTimers = localStorageGetItem('timers');
    const allTimersArr = [];
    for (const issueId in allTimers) {
        allTimersArr.push(allTimers[issueId]);
    }

    return allTimersArr;
};
