import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Modal = ({ children, open, onClose, className, small = false, isX = true }) => {
    if (!open) return null;

    const classes = cx('modal', { small, [className]: className });
    return (
        <div className={cx('wrapper')}>
            <div onClick={() => onClose()} className={cx('overlay')}></div>
            <main className={classes}>
                {isX && (
                    <button className={cx('modal-close')} onClick={() => onClose()}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                )}
                <div className={cx('modal-content')}>{children}</div>
            </main>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    small: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

export default Modal;
