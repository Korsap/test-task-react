import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Main from '../Main/Main';
import Task from '../Task/Task';

import './style.css';

const Page = () => (
    <div className="l-container">
        <section className="l-sidebar">
            <nav className="b-sidebar">
                <Link
                    to='/'
                    className="b-sidebar__logo"
                >Dzhira Software</Link>
                <ul className="b-sidebar__menu">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/browse/10001/JD-1'>Task JD-1</Link></li>
                    <li><Link to='/browse/10002/JD-2'>Task JD-2</Link></li>
                    <li><Link to='/browse/10003/JD-3'>Task JD-3</Link></li>
                </ul>
            </nav>
        </section>
        <section className="l-content">
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/browse/:issueId/:issueKey' component={Task}/>
            </Switch>
        </section>
    </div>
);

export default Page;
