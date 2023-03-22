import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Login.module.scss';
import SignUpForm from './SignUpForm';

const cx = classNames.bind(styles);

const SignUpOptions = () => {
    const [nextOption, setNextOption] = useState(true);

    const handleClick = (e) => {
        setNextOption(false);
        e.preventDefault();
    };

    return (
        <>
            {nextOption ? (
                <>
                    <h2 className={cx('login-title')}>Sign up for TikTok</h2>
                    <div className={cx('login-body')}>
                        <a href="/signup/use-or-email" className={cx('login-link')} onClick={handleClick}>
                            <FontAwesomeIcon icon={faUser} className={cx('login-icon')} />
                            <p>Use phone or email </p>
                        </a>
                    </div>
                </>
            ) : (
                <SignUpForm onClick={() => setNextOption(true)} />
            )}
        </>
    );
};

export default SignUpOptions;
