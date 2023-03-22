import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function VideoSidebar({ likes = 0, shares = 0, messages = 0 }) {
    const [like, setLike] = useState(false);

    return (
        <div className={cx('action')}>
            <div className={cx('action-item')}>
                <button className={cx('action-btn')} onClick={() => setLike(!like)}>
                    <div className={cx('stage')}>
                        <div className={cx('heart', { 'is-active': like })}></div>
                        {/* {!like && <FontAwesomeIcon className={cx('action-icon')} icon={faHeart} />} */}
                    </div>
                </button>
                <strong className={cx('count')}>{like ? likes + 1 : likes}</strong>
            </div>
            <div className={cx('action-item')}>
                <button className={cx('action-btn')}>
                    <FontAwesomeIcon className={cx('action-icon')} icon={faCommentDots} />
                </button>
                <strong className={cx('count')}>{messages}</strong>
            </div>
            <div className={cx('action-item')}>
                <button className={cx('action-btn')}>
                    <FontAwesomeIcon className={cx('action-icon')} icon={faShare} />
                </button>
                <strong className={cx('count')}>{shares}</strong>
            </div>
        </div>
    );
}
VideoSidebar.propTypes = {
    likes: PropTypes.number,
    messages: PropTypes.number,
    shares: PropTypes.number,
};
export default VideoSidebar;
