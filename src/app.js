import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter, { history } from './routers/AppRouter.js';
import configureStore from './store/configure-store';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';

// set the store to the default from ./store/configure-store
const store = configureStore();
// jsx provider
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
// variable that states whether the page has rendered
let hasRendered = false;
// will only render app if hasRendered is false, then sets it to true
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    };
};
// a glamorous loading message
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));
// redirect user based off whether they log in or out
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // dispatch login and logout here vs in the action file because this firebase
        // function will get called when the user first visits the page. without this,
        // they wouldn't have any data loaded if they were implicitly logged in.
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            };
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    };
});