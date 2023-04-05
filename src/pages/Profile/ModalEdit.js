import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const ModalEdit = ({ open, onClose, className }) => {
    if (!open) return null;

    return (
        <div className={cx('wrapper-edit')}>
            <div onClick={() => onClose()} className={cx('overlay')}></div>
            <section className={cx('modal')}>
                <div className={cx('modal-content')}>
                    <div className={cx('modal-content2')}>
                        <div className={cx('edit-profile-popup')}>
                            <header className={cx('edit-profile-header')}>
                                <span className={cx('header-text')}>Edit profile</span>
                                <button className={cx('modal-close')} onClick={() => onClose()}>
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                            </header>
                            <main className={cx('edit-profile-main')}>
                                <div className={cx('edit-profile-item')}>
                                    <span className={cx('edit-profile-title')}>Profile photo</span>
                                    <div className={cx('edit-profile-avatar')}>
                                        <img
                                            className={cx('edit-profile-img')}
                                            src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/849d63ebcbe23fbe35797d663f0a3e00~c5_100x100.jpeg?x-expires=1680530400&x-signature=ll7O8hyXP2zOunoTRnVcfaPlWlc%3D"
                                            alt="Avatar"
                                        />
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                        <input type="file" accept="image/*" />
                                    </div>
                                </div>
                                <div className={cx('edit-profile-item')}>
                                    <span className={cx('edit-profile-title')}>Username</span>
                                    <div className={cx('edit-profile-body')}>
                                        <div className={cx('edit-profile-input')}>
                                            <input type="text" className={cx('edit-input-text')} />
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <p className={cx('edit-profile-link')}>www.tiktok.com/@ttkiet17203</p>
                                        <p className={cx('edit-profile-tip')}>
                                            Usernames can only contain letters, numbers, underscores, and periods.
                                            Changing your username will also change your profile link.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('edit-profile-item')}>
                                    <span className={cx('edit-profile-title')}>Name</span>
                                    <div className={cx('edit-profile-body')}>
                                        <input type="text" className={cx('edit-input-text')} />
                                        <p className={cx('edit-profile-tip')}>
                                            Your nickname can only be changed once every 7 days.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('edit-profile-item')}>
                                    <span className={cx('edit-profile-title')}>Bio</span>
                                    <div className={cx('edit-profile-body')}>
                                        <textarea className={cx('edit-input-text', 'edit-textarea')}></textarea>
                                        <p className={cx('edit-profile-tip')}>0/80</p>
                                    </div>
                                </div>
                            </main>
                            <footer className={cx('edit-profile-footer')}>
                                <Button onClick={() => onClose()}>Cancel</Button>
                                <Button primary>Save</Button>
                            </footer>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

ModalEdit.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    small: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

export default ModalEdit;
