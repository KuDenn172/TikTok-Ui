import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import Image from '~/components/Images/Image';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image
                    className={cx('avatar')}
                    src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/60946ad67b89bda1c64b9e92a66022a7.jpeg?x-expires=1677330000&x-signature=eVHf2iPPWtOqEdIdPTqB22IwpC4%3D"
                    alt=""
                />
                <Button primary className={cx('follow-btn')}>
                    Follow
                </Button>
            </header>

            <div className={cx('info')}>
                <p className={cx('nickname')}>
                    <strong>mihye02</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Mihye</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>8.2M</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {};
export default AccountPreview;
