import React from 'react';

import DashboardTimer from '../Timer/DashboardTimer';

import './style.css';

const Main = () => (
    <div>
        <div className="b-page-title">Dashboard</div>
        <div className="b-dashboard-widget">
            <div className="b-dashboard-widget__title">
            Timesheet
            </div>
            <div className="b-dashboard-widget__content">
                <DashboardTimer />
            </div>
        </div>
    </div>
);

export default Main;
