import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import LoginOptions from './LoginOptions';

const cx = classNames.bind(styles);

const Login = ({ onClick }) => {
 

    const handleComponent = (e) => {
        onClick();
        e.preventDefault();
    };

    return (
        <div className={cx('login-container')}>
            <div className={cx('login-content')}>
                <LoginOptions />
            </div>

            <div className={cx('login-footer')}>
                Don’t have an account?{' '}
                <a href="/signup" className={cx('login-convert')} onClick={handleComponent}>
                    Sign Up
                </a>
            </div>
        </div>
    );
};

Login.propTypes = {};

export default Login;
