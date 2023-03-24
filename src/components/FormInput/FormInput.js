import { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './FormInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const FormInput = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [focused, setFocused] = useState(false);
    const {
        type,
        value,
        name,
        label,
        autoFocus = false,
        placeholder,
        className,
        errorMessage = [],
        checkValid,
        onInput,
        onIsSubmit,
        ...passProps
    } = props;

    const _props = {
        onInput,
        ...passProps,
    };
    const classes = cx('form-input', { [className]: className });

    const inputRef = useRef();
    useEffect(() => {
        setShowError(!inputRef.current.validity.valid);
    }, [value]);
    return (
        <>
            <div className={cx('form-control', { invalid: checkValid })}>
                {label && <div className={cx('form-label')}>{label}</div>}

                <div className={cx({ 'control-pass': type === 'password' })}>
                    <input
                        ref={inputRef}
                        type={!showPassword ? type : 'text'}
                        name={name}
                        className={classes}
                        autoFocus={autoFocus}
                        value={value}
                        placeholder={placeholder}
                        {..._props}
                        onBlur={() => setFocused(true)}
                        onClick={() => setFocused(false)}
                        onFocus={() => name === 'confirmPass' && setFocused(true)}
                        focused={focused.toString()}
                    />

                    {type === 'password' && (
                        <FontAwesomeIcon
                            icon={!showPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPassword(!showPassword)}
                            className={cx('toggle-pass')}
                        />
                    )}
                </div>
                <div>
                    {errorMessage.map((message, index) => (
                        <small key={index} className={cx('error-message', { show: showError && focused })}>
                            {message}
                        </small>
                    ))}
                </div>
            </div>
        </>
    );
});
FormInput.propTypes = {
    props: PropTypes.object,
};

export default FormInput;
