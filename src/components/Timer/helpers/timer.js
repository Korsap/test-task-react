import {
    setTimerToLocalStorage,
    getTimerFromLocalStorage,
    getAllTimersFromLocalStorage,
    removeTimerFromLocalStorage,
} from './localStorage.js';
import { HOUR, MINUTE, SECUNDE } from '../constants/constants.js';

import {
    getTimePartsInHMSFormat,
} from '../helpers/formatters.js';

export const getAllCountedTime = (timerData) => {
    return timerData.active
        ? timerData.lastUpdate - timerData.started + timerData.savedTime
        : timerData.started + timerData.savedTime;
};

export const timerDefaultState = {
    active: null,
    firstStart: 0,
    started: 0,
    savedTime: 0,
    lastUpdate: 0,
    otherActiveTimer: null,
};

export const isTimerExist = (timerData) => {
    return timerData.active !== undefined;
};

export const getActiveTimerData = () => {
    let activeIssueTimerData = null;

    getAllTimersFromLocalStorage()
        .forEach((timer)=>{
            if (timer.active) {
                activeIssueTimerData = timer;
            }
        });

    return activeIssueTimerData
        ? {
            ...activeIssueTimerData,
        }
        : null;
};

export const getTimerData = (issueId, checkOtherTimers = true) => {
    const issueTimerData = getTimerFromLocalStorage(issueId);
    let otherActiveTimer = null;

    if (checkOtherTimers && (!issueTimerData || !issueTimerData.active)) {
        otherActiveTimer = getActiveTimerData();
    }
    return {
        ...issueTimerData,
        otherActiveTimer,
    };
};

export const stopTimer = (issueId) => {
    const timerData = getTimerData(issueId);

    // если таймер останавливается из другой вкладки, у него будет не актуальный lastUpdate
    if (timerData.active) {
        timerData.lastUpdate = Date.now();
    }

    const savedTime = getAllCountedTime(timerData);

    setTimerToLocalStorage({
        ...timerData,
        savedTime,
        active: false,
        started: 0,
    });
};

const stopAllTimers = () => {
    getAllTimersFromLocalStorage()
        .forEach((timers) => {
            stopTimer(timers.issueId);
        });
};

export const startTimer = (issueId, issueKey) => {
    const currentTime = Date.now();
    const timerData = getTimerData(issueId);

    stopAllTimers();

    if (timerData.firstStart) {
        setTimerToLocalStorage({
            ...timerData,
            active: true,
            started: currentTime,
            lastUpdate: currentTime,
        });
    }
    else {
        setTimerToLocalStorage({
            ...timerDefaultState,
            issueId,
            issueKey,
            active: true,
            firstStart: currentTime,
            started: currentTime,
            lastUpdate: currentTime,
        });
    }
};

export const clearTimer = (issueId) => {
    removeTimerFromLocalStorage(issueId);
};

export const getTimeParts = (time) => {
    const hour = ~~(time / HOUR);
    const minute = ~~((time - hour * HOUR) / MINUTE);
    const secunde = ~~((time - hour * HOUR - minute * MINUTE) / SECUNDE);

    return {
        hour,
        minute,
        secunde,
    };
};

export const getAllCountedFormattedTime = (timerData, withSeconds = true) => {
    const allCountedTime = getAllCountedTime(timerData);
    return getTimePartsInHMSFormat(getTimeParts(allCountedTime), withSeconds);
};

export const getAllTimers = () => {
    return getAllTimersFromLocalStorage();
};
