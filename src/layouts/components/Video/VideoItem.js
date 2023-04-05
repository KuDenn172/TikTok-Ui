import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Video.module.scss';
import Image from '../../../components/Images';
import Button from '../../../components/Button';
import Tippy from '@tippyjs/react/headless';
import AccountPreview from '../../../components/SuggestedAccounts/AccountPreview';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import Video from './Video';

import video1 from '~/assets/video1.mp4';
import VideoSidebar from './VideoSibar';

const cx = classNames.bind(styles);

const VideoItem = forwardRef(({ data }, ref) => {
    const [follow, setFollow] = useState(!data.following);

    const renderResult = (attrs) => (
        <div className={cx('preview')} tabIndex="-1" {...attrs}>
            <WrapperPopper>
                <AccountPreview dataPreview={data} followers={follow} />
            </WrapperPopper>
        </div>
    );
    return (
        <div ref={ref} to={``} className={cx('account-item')}>
            <Tippy delay={[800, 0]} interactive placement="bottom" offset={[-30, 2]} render={renderResult}>
                <div>
                    <Image className={cx('avatar')} src={data.avatar} alt="" />
                </div>
            </Tippy>

            <div className={cx('account-content')}>
                <Tippy delay={[800, 0]} interactive placement="bottom" offset={[-30, 2]} render={renderResult}>
                    <div className={cx('info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.verified && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data.unique_id}</p>
                    </div>
                </Tippy>
                <span className={cx('title')}>{data.signature}</span>
                <strong className={cx('music')}>
                    <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} />
                    {data.caption ||
                        'Relaxing Music for Stress Relief. Calm Music for Meditation, Sleep, Relax, Healing Therapy'}
                </strong>

                <div className={cx('video-content')}>
                    <Video src={data.video || video1} />
                    <VideoSidebar likes={1700} messages={200} shares={2003} />
                </div>
            </div>

            <Button
                outline={follow}
                small
                onClick={() => {
                    setFollow(!follow);
                }}
            >
                {follow ? 'Follow' : 'Following'}
            </Button>
        </div>
    );
});
VideoItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default VideoItem;
