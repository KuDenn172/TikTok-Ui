import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import FormInput from '../FormInput';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

const ForgotPassword = ({ onClick }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [information, setInformation] = useState('');
    const { restPassword } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        await restPassword(email)
            .then((userCredential) => {
                setInformation('Check your inbox for email');
                setLoading(true);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setInformation('Failed to rest password');
            });

        // submit form
    }

    return (
        <>
            <FontAwesomeIcon icon={faAngleLeft} className={cx('back-option')} onClick={() => onClick()} />
            <form onSubmit={handleSubmit}>
                <h2 className={cx('login-title')}>Reset password</h2>

                {information && <span className={cx('error')}>{information}</span>}

                <div className={cx('login-body')}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Enter email address</div>
                        <FormInput
                            name="email"
                            placeholder="Email address"
                            value={email}
                            autoComplete="email"
                            required={true}
                            errorMessage={['Enter a valid email address']}
                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button
                        primary
                        large
                        disable={!email && !loading}
                        className={cx('form-submit', { 'login-button': !email && !loading })}
                        type="submit"
                    >
                        Rest Password
                    </Button>
                </div>
            </form>
        </>
    );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
