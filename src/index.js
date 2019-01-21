import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Page from './components/Page/Page';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Page />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
