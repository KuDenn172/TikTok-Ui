import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useElementOnScreen from '~/hooks/useElementOnScreen';
import VideoInside from './VideoInside';
import video2 from '~/assets/video2.mp4';
const cx = classNames.bind(styles);

function Video({ src, customFallback = video2, className, ...passProps }) {
    const [playing, setPlaying] = useState(true);
    const [fallback, setFallBack] = useState('');
    const [currentSong, setCurrentSong] = useState({});

    const videoRef = useRef(null);

    const handleError = () => {
        setFallBack(customFallback);
    };
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4,
    };

    const isVisible = useElementOnScreen(options, videoRef);

    const handlePlayVideo = () => {
        if (!playing) {
            videoRef.current?.play();
            setPlaying(true);
        } else {
            videoRef.current?.pause();
            setPlaying(false);
        }
    };

    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                videoRef.current?.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current?.pause();
                setPlaying(false);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    const handleTimeSliderChange = () => {
        const currentTime = videoRef.current.currentTime;
        const durationTime = videoRef.current.duration;
        setCurrentSong({
            progress: (currentTime / durationTime) * 100,
            currentTime,
            duration: durationTime,
        });
    };

    const classes = cx('video', { [className]: className });

    return (
        <div className={cx('video-body')}>
            <video
                ref={videoRef}
                className={classes}
                autoPlay={true}
                tabIndex={2}
                src={fallback || src}
                onClick={handlePlayVideo}
                loop
                onTimeUpdate={handleTimeSliderChange}
                onError={handleError}
            ></video>

            <VideoInside playing={playing} currentSong={currentSong} ref={videoRef} onClick={handlePlayVideo} />
        </div>
    );
}

Video.propTypes = {
    src: PropTypes.string,
};

export default Video;
