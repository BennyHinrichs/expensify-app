import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__buffer">
            <div className="box-layout__box">
                <div className="show-for-mobile">
                    <img src="/images/logo.png" className="box-layout__logo box-layout__logo--small" />
                    <p className="form__error login-font">Your wallet and worries all in one place</p>
                </div>
                <div className="show-for-large">
                    <img src="/images/logoSubtitle.png" className="box-layout__logo box-layout__logo--large" />
                </div>
                <button className="button" onClick={startLogin}>Login with Google</button>
            </div>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);