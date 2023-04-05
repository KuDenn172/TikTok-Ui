import { faAt, faCheck, faExclamationCircle, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { ref, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import Discard from '~/components/Discard';
import Modal from '~/components/Modal';
import database from '~/firebase';

import styles from './Upload.module.scss';

const cx = classNames.bind(styles);
function UploadForm({ captionValue, changeVideo, videoAsset, handleUploadOther }) {
    const [charCount, setCharCount] = useState(0);
    const [copyright, setCopyright] = useState(false);
    const [isComment, setIsComment] = useState(true);
    const [valueHashTag, setValueHashTag] = useState('');
    const [select, setSelect] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [postVideo, setPostVideo] = useState(false);
    const [uploadOther, setUploadOther] = useState(false);

    const navigate = useNavigate();
    const captionRef = useRef();
    const handelInputCaption = (e) => {
        const text = e.currentTarget.textContent.substring(0, 2200);
        setCharCount(text.length);
    };

    const handleKeyDown = (e) => {
        if (charCount >= 2200 && e.keyCode !== 8) {
            e.preventDefault();
        }
    };
    const discardVideo = () => {
        changeVideo();
        setOpenModal(false);
    };

    useEffect(() => {
        const nameVideo = captionValue?.name?.lastIndexOf('.');
        const textContent = captionRef.current.textContent.substring(0, 2200) + valueHashTag;
        const text = (captionRef.current.textContent = textContent || captionValue?.name?.slice(0, nameVideo) || '');
        if (captionValue === null) {
            captionRef.current.textContent = '';
        }
        setCharCount(text.length);
    }, [captionValue, valueHashTag]);

    const postUserData = async () => {
        const postData = {
            id: `${Date.now()}`,
            region: 'VN',
            sec_uid: 'MS4wLjABAAAAKqJeZzkHbgsUy1jUjJifTqu0mFFihueSNSzmapNQgl4-BGLn2jKrhGFLPo-ONqbR',
            unique_id: 'KuDen1',
            nickname: 'kuhoiden1',
            signature: 'Là 1 dân chơi chính hiệu của Việt Name',
            avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/849d63ebcbe23fbe35797d663f0a3e00~c5_720x720.jpeg?x-expires=1680271200&x-signature=XUTg58av2DCbsJfSJYcP45lw7os%3D',
            video: videoAsset && videoAsset,
            caption: captionRef.current.textContent,
            who_watch: select,
            allow_user: [`${isComment ? 'comment' : 'no_comment'}`, 'duet', 'stitch'],
            copyright: copyright,
            verified: true,
            following: false,
            aweme_count: 0,
            follower_count: 0,
            favoriting_count: 0,
            total_favorited: 0,
        };
        setPostVideo(true);
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/listvideo/list_video/' + Date.now()] = postData;
        setTimeout(() => {
            setPostVideo(false);
            setUploadOther(true);
            return update(ref(database), updates);
        }, 5000);
    };

    const videoOther = () => {
        handleUploadOther();
        setUploadOther(false);
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [videoAsset]);

    const handleBeforeUnload = (event) => {
        // discardVideo();
        event.preventDefault();
        event.returnValue = '';
    };

    return (
        <>
            <div className={cx('upload-form')}>
                <div className={cx('form-caption')}>
                    <div className={cx('caption-header')}>
                        {' '}
                        <strong>Caption</strong>
                        <span className={cx('text-limit')}>{charCount} / 2200</span>
                    </div>
                    <div className={cx('caption-editor')}>
                        <div
                            className={cx('caption-input')}
                            ref={captionRef}
                            contentEditable={true}
                            onKeyDown={handleKeyDown}
                            onInput={handelInputCaption}
                        ></div>
                        <div className={cx('caption-hashtag')}>
                            <FontAwesomeIcon
                                icon={faAt}
                                className={cx('hashtag-icon')}
                                onClick={() => setValueHashTag('@')}
                            />
                            <FontAwesomeIcon
                                icon={faHashtag}
                                className={cx('hashtag-icon')}
                                onClick={() => setValueHashTag('#')}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('form-cover')}>
                    <strong>Cover</strong>
                    <div className={cx('cover-editor')}>
                        <div className={cx('body-editor')}>
                            <div className={cx('video-editor')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('form-cover')}>
                    <strong>Who can watch this video</strong>
                    <select className={cx('form-select')} onChange={(e) => setSelect(e.target.value)}>
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                        <option value="private">Private</option>
                    </select>
                    <strong className={cx('form-cover')}>Allow users to:</strong>
                    <div className={cx('form-allows')}>
                        <div className={cx('allows')}>
                            <input type="checkbox" checked={isComment} onChange={() => setIsComment(!isComment)} />
                            Comment
                        </div>
                        <div className={cx('allows')}>
                            <input type="checkbox" checked disabled />
                            Duet
                        </div>
                        <div className={cx('allows')}>
                            <input type="checkbox" checked disabled />
                            Stitch
                        </div>
                    </div>
                    <p className={cx('hint')}>
                        Duet and Stitch settings are restricted by TikTok to protect your privacy
                    </p>
                </div>

                <div className={cx('form-switch')}>
                    <strong>Run a copyright check</strong>
                    <div className={cx('switch-wrapper')}>
                        <input type="checkbox" id="switch" onChange={() => setCopyright(!copyright)} />
                        <label htmlFor="switch">Toggle</label>
                    </div>
                </div>
                {!copyright ? (
                    <p className={cx('copyright')}>
                        We'll check your video for potential copyright infringements on used sounds. If infringements
                        are found, you can edit the video before posting. <span className={cx('more')}>Learn more</span>
                    </p>
                ) : (
                    <div className={cx('tool-tip')}>
                        {!captionValue ? (
                            <>
                                <FontAwesomeIcon icon={faExclamationCircle} className={cx('tool-warning')} />
                                <span className={cx('tool-text')}>
                                    Copyright check will not begin until your video is uploaded.
                                </span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faCheck} className={cx('tool-check')} />
                                <span className={cx('tool-text')}>No issues detected..</span>
                            </>
                        )}
                    </div>
                )}

                {copyright && !!captionValue && (
                    <p className={cx('copyright')}>
                        Note: Results of copyright checks aren't final. For instance, future changes of the copyright
                        holder's authorization to the sound may impact your video may impact your video.{' '}
                        <span className={cx('more')}>Learn more</span>
                    </p>
                )}

                <div className={cx('form-button')}>
                    <Button onClick={() => setOpenModal(!openModal)}>Discard</Button>
                    <Button
                        disable={!captionValue}
                        primary={!!captionValue}
                        className={cx({ 'button-post': !captionValue })}
                        onClick={postUserData}
                    >
                        Post
                    </Button>
                </div>
            </div>
            <Modal isX={false} medium open={openModal} onClose={() => setOpenModal(false)}>
                <Discard
                    title="Discard this post?"
                    subTitle="The video and all edits will be discarded."
                    textMainBtn="Discard"
                    textSubBtn="Continue editing"
                    onChangeVideo={discardVideo}
                    continueEdit={() => setOpenModal(false)}
                />
            </Modal>
            {postVideo ? (
                <Modal isX={false} small open={true}>
                    <div className={cx('post-video')}>
                        <span className={cx('loader')}></span>
                        <p className={cx('upload-percent')}>Uploading...</p>
                        <p className={cx('upload-name')}>Leaving the page does not interrupt the posting process</p>
                    </div>
                </Modal>
            ) : (
                <Modal isX={false} medium open={uploadOther} onClose={() => setOpenModal(false)}>
                    <Discard
                        title="Your videos are being uploaded to TikTok!"
                        textMainBtn="Upload another video"
                        textSubBtn="View profile"
                        onChangeVideo={videoOther}
                        continueEdit={() => navigate('/profile/@username')}
                    />
                </Modal>
            )}
        </>
    );
}

export default UploadForm;
