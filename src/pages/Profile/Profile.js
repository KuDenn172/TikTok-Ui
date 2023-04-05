import { faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faPlay, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { UserIcon } from '~/components/Icons';

import Button from '~/components/Button';
import styles from './Profile.module.scss';
import video1 from '~/assets/video1.mp4';
import ModalEdit from './ModalEdit';
const cx = classNames.bind(styles);
function Profile() {
    const [activeTab, setActiveTab] = useState('videos');
    const [openModal, setOpenModal] = useState(false);
    const [listVideo, setListVideo] = useState(false);
    const feedTabRef = useRef(null);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    useEffect(() => {
        const feedTab = feedTabRef.current;
        if (activeTab === 'videos') {
            feedTab.style.setProperty('transform', 'translateX(0)');
        } else {
            feedTab.style.setProperty('transform', 'translateX(230px)');
        }
    }, [activeTab]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('profile')}>
                    <div className={cx('profile-info')}>
                        <img
                            className={cx('user-image')}
                            src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/849d63ebcbe23fbe35797d663f0a3e00~c5_100x100.jpeg?x-expires=1680418800&x-signature=Zt%2Fi7jQ0463j8WkTI7pVnLrbWIM%3D"
                            alt=""
                        />
                        <div className={cx('user')}>
                            <h2 className={cx('user-title')}>ttkiet17203</h2>
                            <h1 className={cx('user-subtitle')}>TTKDen</h1>
                            <Button
                                className={cx('profile-edit')}
                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                onClick={() => setOpenModal(!openModal)}
                            >
                                Edit profile
                            </Button>
                        </div>
                    </div>
                    <div className={cx('count-info')}>
                        <div className={cx('count-number')}>
                            <strong>50</strong>
                            <span>Following</span>
                        </div>
                        <div className={cx('count-number')}>
                            <strong>18</strong>
                            <span>Followers</span>
                        </div>
                        <div className={cx('count-number')}>
                            <strong>0</strong>
                            <span>Likes</span>
                        </div>
                    </div>
                    <h2 className={cx('user-bio')}>Đen🌚</h2>
                    <FontAwesomeIcon icon={faShare} className={cx('share')} />
                </div>
                <main className={cx('profile-video')}>
                    <div className={cx('video-feed-tab')}>
                        <p
                            className={cx('feed-tab', { active: activeTab === 'videos' })}
                            onClick={() => handleTabClick('videos')}
                        >
                            <strong>Videos</strong>
                        </p>
                        <p
                            className={cx('feed-tab', { active: activeTab === 'liked' })}
                            onClick={() => handleTabClick('liked')}
                        >
                            <strong>
                                <FontAwesomeIcon icon={faLock} /> Liked
                            </strong>
                        </p>
                        <div ref={feedTabRef} className={cx('horizontal')}></div>
                    </div>
                    <div className={cx('video-feed-content')}>
                        {activeTab === 'videos' &&
                            (!listVideo ? (
                                <div className={cx('list-video-item')}>
                                    <div>
                                        <div className={cx('video-item')}>
                                            <div className={cx('video')}>
                                                <video playsInline src={video1} loop />
                                            </div>
                                            <div className={cx('play-count')}>
                                                <div>
                                                    <FontAwesomeIcon icon={faPlay} className={cx('play')} />
                                                    <strong>10K</strong>
                                                </div>
                                                <FontAwesomeIcon icon={faLock} className={cx('play')} />
                                            </div>
                                        </div>
                                        <span className={cx('caption')}>day la video</span>
                                    </div>
                                    <div>
                                        <div className={cx('video-item')}>
                                            <div className={cx('video')}>
                                                <video playsInline src={video1} loop />
                                            </div>
                                            <div className={cx('play-count')}>
                                                <div>
                                                    <FontAwesomeIcon icon={faPlay} className={cx('play')} />
                                                    <strong>10K</strong>
                                                </div>
                                                <FontAwesomeIcon icon={faLock} className={cx('play')} />
                                            </div>
                                        </div>
                                        <span className={cx('caption')}>day la video</span>
                                    </div>{' '}
                                    <div>
                                        <div className={cx('video-item')}>
                                            <div className={cx('video')}>
                                                <video playsInline src={video1} loop />
                                            </div>
                                            <div className={cx('play-count')}>
                                                <div>
                                                    <FontAwesomeIcon icon={faPlay} className={cx('play')} />
                                                    <strong>10K</strong>
                                                </div>
                                                <FontAwesomeIcon icon={faLock} className={cx('play')} />
                                            </div>
                                        </div>
                                        <span className={cx('caption')}>day la video</span>
                                    </div>{' '}
                                    <div>
                                        <div className={cx('video-item')}>
                                            <div className={cx('video')}>
                                                <video playsInline src={video1} loop />
                                            </div>
                                            <div className={cx('play-count')}>
                                                <div>
                                                    <FontAwesomeIcon icon={faPlay} className={cx('play')} />
                                                    <strong>10K</strong>
                                                </div>
                                                <FontAwesomeIcon icon={faLock} className={cx('play')} />
                                            </div>
                                        </div>
                                        <div className={cx('caption')}>
                                            <span>day la video</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('no-video')}>
                                    <div className={cx('video-upload')}>
                                        <UserIcon />
                                        <p className={cx('first-title')}>Upload your first video</p>
                                        <p className={cx('first-desc')}>Your videos will appear here</p>
                                    </div>
                                </div>
                            ))}
                        {activeTab === 'liked' && (
                            <div className={cx('no-video')}>
                                <div className={cx('video-upload')}>
                                    <UserIcon />
                                    <p className={cx('first-title')}>Like your first video</p>
                                    <p className={cx('first-desc')}>Your videos will appear here</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <ModalEdit open={openModal} onClose={() => setOpenModal(false)} className={cx('edit-profile')}>
            </ModalEdit>
        </>
    );
}

export default Profile;
