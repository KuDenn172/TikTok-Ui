import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Modal = ({ children, open, onClose }) => {
    if (!open) return null;
    return (
        <>
            <div onClick={() => onClose()} className={cx('overlay')}></div>
            <main className={cx('modal')}>
                <button className={cx('modal-close')} onClick={() => onClose()}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <div className={cx('modal-content')}>{children}</div>
            </main>
        </>
    );
};

Modal.propTypes = {};

export default Modal;
