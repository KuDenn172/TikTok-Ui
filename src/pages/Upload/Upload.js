import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Button from '~/components/Button';

import styles from './Upload.module.scss';

const cx = classNames.bind(styles);
const Upload = () => {
    return (
        <main className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('post-title')}>
                        <span className={cx('title')}>Upload video</span>
                        <span className={cx('sub-title')}>Post a video to your account</span>
                    </div>

                    <div className={cx('post-content')}>
                        <div className={cx('uploader')}>
                            <input type="file"  accept='video/*' className={cx('upload-file')}/>
                            <div className={cx('upload')}>
                                <img
                                    className={cx('upload-img')}
                                    src="https://lf16-tiktok-common.ibytedtos.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                    alt="Upload"
                                />
                                <span className={cx('upload-text')}>Select video to upload</span>
                                <span className={cx('upload-subtext')}>Or drag and drop a file</span>

                                <div className={cx('upload-video-info')}>
                                    <span className={cx('text-info')}>MP4 or WebM</span>
                                    <span className={cx('text-info')}>720x1280 resolution or higher</span>
                                    <span className={cx('text-info')}>Up to 30 minutes</span>
                                    <span className={cx('text-info')}>Less than 2 GB</span>
                                </div>
                                <Button primary className={cx('upload-button')}>
                                    Select file
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

Upload.propTypes = {};

export default Upload;
