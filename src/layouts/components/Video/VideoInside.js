import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { forwardRef, useEffect, useState } from 'react';
import { CalculatorSeconds } from '~/time/time';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function VideoInside({ playing = false, currentSong, onClick }, videoRef) {
    const [volume, setVolume] = useState(100);

    const { progress, currentTime, duration } = currentSong;

    const handleVolume = () => {
        if (volume <= 0) setVolume(100);
        if (volume > 0) setVolume(0);
    };

    useEffect(() => {
        videoRef.current.volume = volume / 100;
    }, [videoRef, volume]);

    const handleChangeVideo = (e) => {
        videoRef.current.currentTime = (e.target.value / 100) * duration;
    };

    return (
        <div className={cx('inside-video')}>
            <div className={cx('inside-controls')}>
                <FontAwesomeIcon onClick={onClick} className={cx('inside-btn')} icon={playing ? faPause : faPlay} />

                <div className={cx('inside-sound')}>
                    <div className={cx('volume-bar')}>
                        <input
                            type="range"
                            className={cx('volume')}
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                        />
                        <div className={cx('volume-bar2')} style={{ height: volume + '%' }}></div>
                    </div>
                    <FontAwesomeIcon
                        className={cx('inside-btn')}
                        onClick={handleVolume}
                        icon={volume <= 0 ? faVolumeXmark : faVolumeHigh}
                    />
                </div>
            </div>

            <div className={cx('progress-container')}>
                <div className={cx('progress-bar')}>
                    <input
                        type="range"
                        value={Math.ceil(progress) || 0}
                        min={0}
                        max={100}
                        className={cx('progress')}
                        onChange={handleChangeVideo}
                    />

                    <div className={cx('progress-bar2')} style={{ width: Math.ceil(progress) + '%' }}></div>
                </div>
                <span className={cx('progress-time')}>
                    {`${CalculatorSeconds(currentTime)}/${CalculatorSeconds(duration)}`}
                </span>
            </div>



            
        </div>
    );
}

// VideoInside.propTypes = {
//     playing: PropTypes.bool,
//     currentSong: PropTypes.object.isRequired,
//     onClick: PropTypes.func,
// };
export default forwardRef(VideoInside);
