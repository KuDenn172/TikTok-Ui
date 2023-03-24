import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { useAuth } from '~/contexts/AuthContext';

import Button from '../Button';
import FormInput from '../FormInput';
import ForgotPassword from './ForgotPassword';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const LoginForm = ({ onClick }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const [loading, setLoading] = useState(false);
    const [infomation, setInfomation] = useState('');
    const { login } = useAuth();
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'email',
            placeholder: 'Email address',
            autoComplete: 'email',
            errorMessage: ['Enter a valid email address'],
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
            required: true,
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            autoComplete: 'new-password',
            errorMessage: ['8 to 20 characters', 'Letters,numbers, and special characters'],
            pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$',
            required: true,
        },
    ];

    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmit(true);
        const data = new FormData(event.target);
        const valueForm = Object.fromEntries(data.entries());
        await login(valueForm.email, valueForm.password)
            .then((userCredential) => {
                window.location.reload();
                navigate('/');
                setInfomation('');
                setLoading(true);
                // ...Mrnam1987& choem1@gmail.com
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setInfomation('Incorrect email or password');
            });
    }

    useEffect(() => {
        values.email && values.password ? setIsSubmit(true) : setIsSubmit(false);
    }, [values.email, values.password]);

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <>
            {!isForgot ? (
                <>
                    <FontAwesomeIcon icon={faAngleLeft} className={cx('back-option')} onClick={() => onClick()} />
                    <form onSubmit={handleSubmit}>
                        <h2 className={cx('login-title')}>Log in</h2>
                        {infomation && <span className={cx('error')}>{infomation}</span>}
                        <div className={cx('login-body')}>
                            <div className={cx('form-group')}>
                                <div className={cx('form-label')}>
                                    Email or username
                                    <small className={cx('form-link')}>Log in with phone</small>
                                </div>

                                {inputs.map((input) => (
                                    <FormInput
                                        key={input.id}
                                        {...input}
                                        value={values[input.name]}
                                        onChange={handleInput}
                                    />
                                ))}

                                <small className={cx('form-link')} onClick={() => setIsForgot(true)}>
                                    Forgot password?
                                </small>
                            </div>
                            <Button
                                primary
                                large
                                disable={!isSubmit && !loading}
                                className={cx('form-submit', { 'login-button': !isSubmit && !loading })}
                                type="submit"
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <ForgotPassword onClick={() => setIsForgot(!isForgot)} />
            )}
        </>
    );
};

LoginForm.propTypes = {
    onClick:PropTypes.func
};

export default LoginForm;
