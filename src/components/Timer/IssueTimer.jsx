import React, { Component } from 'react';

import {
    startTimer,
    stopTimer,
    clearTimer,
    getAllCountedTime,
    getTimerData,
    timerDefaultState,
    getTimeParts,
} from './helpers/timer.js';

import {
    addLeadingZero,
} from './helpers/formatters.js';

import './style.css';

/*
    Принцип синхронизации таймеров с LS:

    Любые изменения в статусе таймера пишутся в LS,
    после этого syncWithLocalStorage достает данные из LS и актуализирует стейт

    Это лишнее чтение из LS, но позволяет избежать ошибок, возникающих из-за двунаправленности потока дынных
*/

const reloadIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14.664" height="16.178"><defs><clipPath id="a"><path d="M0 584h482V0H0z"/></clipPath></defs><g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 -408.655 652.88)"><path d="M307.44 483.974a.949.949 0 0 0 .947-.948 3.607 3.607 0 0 1 3.603-3.603 3.606 3.606 0 0 1 3.602 3.603 3.607 3.607 0 0 1-3.602 3.603c-.047 0-.088.02-.133.027v-1.203c0-.171-.208-.247-.322-.133l-2.01 2.01a.205.205 0 0 0 .018.266l1.992 2.01c.114.114.322.038.322-.133v-.975c.045.007.086.027.133.027a5.505 5.505 0 0 0 5.5-5.5 5.505 5.505 0 0 0-5.5-5.498 5.505 5.505 0 0 0-5.499 5.499c0 .523.425.948.948.948" fill="#babfc8"/></g></svg>;

const { hostOrigin } = 'localhost:8080';

class IssueTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocalStorageAvailable: true,
            ...timerDefaultState,
            ...props,
        };

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.issueId !== prevState.issueId) {
            return {
                ...nextProps,
                ...getTimerData(nextProps.issueId),
            };
        }
        return null;
    }

    componentDidMount() {
        if (this.state.isLocalStorageAvailable) {
            this.syncWithLocalStorage();

            const sync = setInterval(() => {
                if (this.state.active) {
                    this.setState({ lastUpdate: Date.now() });
                }
                this.syncWithLocalStorage();
            }, 500);

            this.setState({
                sync,
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.sync);
    }

    startTimer = () => {
        startTimer(this.state.issueId, this.state.issueKey);
        this.syncWithLocalStorage();
    }

    stopTimer = () => {
        stopTimer(this.state.issueId);
        this.syncWithLocalStorage();
    }

    resetTimer = () => {
        clearTimer(this.state.issueId);
        this.syncWithLocalStorage();
    }

    openLogWorkModal = () => {
        alert('Йа модалко');
    }

    syncWithLocalStorage = () => {
        const issueTimerData = {
            ...timerDefaultState,
            ...getTimerData(this.state.issueId),
        };

        if (issueTimerData.active !== this.state.active || this.state.otherActiveTimer !== issueTimerData.otherActiveTimer) {
            this.setState({
                ...issueTimerData,
            });
            return;
        }

        return;
    }

    render() {
        const allCountedTime = getAllCountedTime(this.state);
        const timeParts = getTimeParts(allCountedTime);

        return (
            <div>
                <div className="b-timer">
                    <div className="b-timer__button">
                        {
                            this.state.active
                                ? <div className="b-timer__stop-btn b-timer__button-control" onClick={this.stopTimer}/>
                                : <div className="b-timer__start-btn b-timer__button-control" onClick={this.startTimer}>
                                    {allCountedTime === 0
                                        ? <span>Start timer</span>
                                        : null
                                    }
                                </div>
                        }
                        {
                            (this.state.active || allCountedTime > 0)
                                ? <div className="b-timer__log-work b-timer__button-control" onClick={this.openLogWorkModal}>
                                Log work
                                </div>
                                : null
                        }
                    </div>
                    <div className={`b-timer__clock ${this.state.active && 'b-timer__clock--active'}`}>
                        {addLeadingZero(timeParts.hour)}:{addLeadingZero(timeParts.minute)}:{addLeadingZero(timeParts.secunde)}
                        <div
                            className='b-timer__clock-reset'
                            onClick={this.resetTimer}
                        >
                            {
                                allCountedTime > 0
                                    ? reloadIcon
                                    : null
                            }
                        </div>
                    </div>
                    {
                        this.state.otherActiveTimer &&
                        <div className="b-timer__other-task">
                            * Timer is currently running in
                            task: <a href={`${hostOrigin}/browse/${this.state.otherActiveTimer.issueKey}`} target="blank">
                                {this.state.otherActiveTimer.issueKey}
                            </a>
                        </div>
                    }
                </div>
            </div>

        );
    }
}

export default IssueTimer;
