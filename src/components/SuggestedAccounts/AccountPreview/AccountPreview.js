import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import Image from '~/components/Images/Image';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ dataPreview, followers = true }) {
    const [follow, setFollow] = useState(followers);

    useEffect(() => {
        setFollow(followers);
        dataPreview.following = follow;
    }, [dataPreview, followers]);
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image className={cx('avatar')} src={dataPreview.avatar} alt={dataPreview.unique_id} />

                <Button
                    primary={follow}
                    onClick={() => {
                        setFollow(!follow);
                        dataPreview.following = !follow;
                    }}
                    className={cx('follow-btn')}
                >
                    {follow ? 'Follow' : 'Following'}
                </Button>
            </header>

            <div className={cx('info')}>
                <p className={cx('nickname')}>
                    <strong>{dataPreview.nickname} </strong>
                    {dataPreview.verified && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{dataPreview.unique_id}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{dataPreview.follower_count}</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{dataPreview.favoriting_count}</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {};
export default AccountPreview;
