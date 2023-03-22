import {faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Login.module.scss';
import LoginForm from './LoginForm';

const cx = classNames.bind(styles);

const LoginOptions = () => {
    const [nextOption, setNextOption] = useState(true);

    const handleClick = (e) => {
        setNextOption(false);
        e.preventDefault();
    };

    return (
        <>
            {nextOption ? (
                <>
                    <h2 className={cx('login-title')}>Log in to TikTok</h2>
                    <div className={cx('login-body')}>
                        <a href="/login/phone-or-email" className={cx('login-link')} onClick={handleClick}>
                            <FontAwesomeIcon icon={faUser} className={cx('login-icon')} />
                            <p>Use phone / email / username</p>
                        </a>
                    </div>
                </>
            ) : (
                <LoginForm onClick={() => setNextOption(true)} />
            )}
        </>
    );
};

export default LoginOptions;
