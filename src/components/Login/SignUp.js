import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import SignUpOptions from './SignUpOptions';

const cx = classNames.bind(styles);

const SignUp = ({ onClick }) => {

    const handleComponent = (e) => {
        onClick();
        e.preventDefault();
    };

    return (
        <div className={cx('login-container')}>
            <div className={cx('login-content')}>
                <SignUpOptions />
            </div>

            <div className={cx('login-footer')}>
                Already have an account?{' '}
                <a href="/signup" className={cx('login-convert')} onClick={handleComponent}>
                    Log In
                </a>
            </div>
        </div>
    );
};

SignUp.propTypes = {};

export default SignUp;
