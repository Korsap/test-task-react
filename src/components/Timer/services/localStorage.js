const originSubdomain = 'unit6dzhiratest.azazzian.net';
const userKey = 'test';
const localStorageKey = `timesheet_${userKey}_${originSubdomain}`;

const defaultStorageState = {
    timers: {},
    state: {},
};

const getStorageOrDefault = () => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || defaultStorageState;
};

export const isLocalStorageAvailable = (() => {
    try {
        localStorage.setItem('ls-check', true);
        return true;
    }
    catch (e) {
        return false;
    }
})();

export const localStorageSetItem = (key, value) => {
    if (!isLocalStorageAvailable) {return false;}

    const path = key.split('.');
    const storage = getStorageOrDefault();

    storage[path[0]][path[1]] = value;

    localStorage.setItem(localStorageKey, JSON.stringify(storage));

    return true;
};

export const localStorageGetItem = (key) => {
    if (!isLocalStorageAvailable) {return null;}

    const path = key.split('.');
    const storage = getStorageOrDefault();

    const value = path.length === 1
        ? storage[path[0]]
        : storage[path[0]][path[1]];

    return value === undefined
        ? null
        : value;
};

export const localStorageRemoveItem = (key) => {
    if (!isLocalStorageAvailable) {return false;}

    const path = key.split('.');
    const storage = getStorageOrDefault();

    delete storage[path[0]][path[1]];
    localStorage.setItem(localStorageKey, JSON.stringify(storage));

    return true;
};
