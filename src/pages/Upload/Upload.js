import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import Button from '~/components/Button';
import Video from '~/layouts/components/Video/Video';

import styles from './Upload.module.scss';
import { storage } from '~/firebase';
import Loading from '~/components/Loading';

import UploadForm from './UploadForm';
import Discard from '~/components/Discard';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);
const Upload = () => {
    const [videoFile, setVideoUpload] = useState();
    const [videoAsset, setVideoAsset] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleUploadOther = () => {
        setIsLoading(false);
        setVideoUpload(null);
    };

    const uploadVideo = async (e) => {
        const videoFile = e.target.files[0];
        if (videoFile) {
            setVideoUpload(videoFile);
            // Tạo tham chiếu lưu trữ từ dịch vụ lưu trữ của chúng tôi
            const storageRef = ref(storage, `Videos/${Date.now()}_${videoFile.name}`);

            // Upload the file
            const uploadTask = uploadBytesResumable(storageRef, videoFile);
            // Tạo các bộ lắng nghe để theo dõi quá trình tải lên.
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Tính toán tiến trình tải lên
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setProgress(Math.trunc(progress));
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                    setIsLoading(false);
                    setProgress(0); // Reset progress to 0
                },
                () => {
                    // Xử lý tải lên thành công khi hoàn thành
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setVideoAsset(downloadURL);

                        setIsLoading(true);
                    });
                },
            );
        }
    };

    const changeVideo = () => {
        if (videoAsset) {
            // Create a reference to the file to delete
            const desertRef = ref(storage, videoAsset);

            // Delete the file
            deleteObject(desertRef)
                .then(() => {
                    setVideoAsset(null);
                    setVideoUpload(null);
                    setOpenModal(false);
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                });
        }
    };

    return (
        <>
            <main className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('post-title')}>
                            <span className={cx('title')}>Upload video</span>
                            <span className={cx('sub-title')}>Post a video to your account</span>
                        </div>

                        <div className={cx('post-content')}>
                            <div className={cx('preview')}>
                                <div className={cx('uploader')}>
                                    {videoFile && progress === 100 ? (
                                        isLoading ? (
                                            <Video src={videoAsset} className={cx('video')} />
                                        ) : (
                                            <div className={cx('loading')}>
                                                <Loading></Loading>
                                            </div>
                                        )
                                    ) : (
                                        <div className={cx('upload')}>
                                            {videoFile && progress >= 0 ? (
                                                <>
                                                    <p className={cx('upload-percent')}>{progress}%</p>
                                                    <div className={cx('upload-progress')}>
                                                        <div
                                                            className={cx('upload-bar')}
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className={cx('upload-name')}>
                                                        {'Uploading...' + videoFile?.name}
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={uploadVideo}
                                                        className={cx('upload-video')}
                                                    />
                                                    <img
                                                        className={cx('upload-img')}
                                                        src="https://lf16-tiktok-common.ibytedtos.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                                        alt="Upload"
                                                    />
                                                    <span className={cx('upload-text')}>Select video to upload</span>
                                                    <span className={cx('upload-subtext')}>
                                                        Or drag and drop a file
                                                    </span>

                                                    <div className={cx('upload-video-info')}>
                                                        <span className={cx('text-info')}>MP4 or WebM</span>
                                                        <span className={cx('text-info')}>
                                                            720x1280 resolution or higher
                                                        </span>
                                                        <span className={cx('text-info')}>Up to 30 minutes</span>
                                                        <span className={cx('text-info')}>Less than 2 GB</span>
                                                    </div>
                                                    <Button primary maxWidth className={cx('upload-button')}>
                                                        Select file
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {isLoading && videoAsset && videoFile && (
                                    <div className={cx('change-video')}>
                                        <div className={cx('upload-file')}>
                                            <FontAwesomeIcon icon={faCheckCircle} className={cx('change-icon')} />{' '}
                                            {videoFile?.name}
                                        </div>
                                        <span
                                            // onClick={changeVideo}
                                            onClick={() => setOpenModal(!openModal)}
                                            className={cx('change-btn')}
                                        >
                                            Change video
                                        </span>
                                    </div>
                                )}
                            </div>

                            <UploadForm
                                captionValue={videoAsset && videoFile}
                                changeVideo={changeVideo}
                                videoAsset={videoAsset}
                                handleUploadOther={handleUploadOther}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Modal isX={false} small open={openModal} onClose={() => setOpenModal(false)}>
                <Discard
                    title="Replace this video?"
                    subTitle="Caption and video settings will still be saved."
                    textMainBtn="Replace"
                    textSubBtn="Continue editing"
                    onChangeVideo={changeVideo}
                    continueEdit={() => setOpenModal(false)}
                />
            </Modal>
        </>
    );
};

Upload.propTypes = {};

export default Upload;
