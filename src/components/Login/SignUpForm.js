import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/AuthContext';
import PropTypes from 'prop-types'


import Button from '../Button';
import FormInput from '../FormInput';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const SignUpForm = ({ onClick }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [infomation, setInfomation] = useState('');
    const { signup } = useAuth();
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPass: '',
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
        {
            id: 3,
            name: 'confirmPass',
            type: 'password',
            placeholder: 'Password confirmation',
            errorMessage: ['Password confirmation failed'],
            pattern: values.password,
            required: true,
        },
    ];

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmit(true);
        const data = new FormData(event.target);
        const valueForm = Object.fromEntries(data.entries());
        await signup(valueForm.email, valueForm.password)
            .then((userCredential) => {
                navigate('/');
                setInfomation('You have successfully created an account');
                setLoading(true);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setInfomation('Failed to create an account');
            });

        // submit form
    }

    useEffect(() => {
        values.email && values.password && values.confirmPass ? setIsSubmit(true) : setIsSubmit(false);
    }, [values.email, values.password, values.confirmPass]);

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>
            <FontAwesomeIcon icon={faAngleLeft} className={cx('back-option')} onClick={() => onClick()} />
            <form onSubmit={handleSubmit}>
                <h2 className={cx('login-title')}>Sign up</h2>
                {infomation && <span className={cx('error')}>{infomation}</span>}

                <div className={cx('login-body')}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>
                            Email
                            <small className={cx('form-link')}>Sign up with phone</small>
                        </div>

                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleInput} />
                        ))}
                    </div>
                    <Button
                        primary
                        large
                        disable={!isSubmit && !loading}
                        className={cx('form-submit', { 'login-button': !isSubmit && !loading })}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </>
    );
};

SignUpForm.propTypes ={
    onClick:PropTypes.func
}

export default SignUpForm;
