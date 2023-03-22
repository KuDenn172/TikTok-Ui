import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
            <span className={cx('loader')}></span>
    );
}

export default Loading;
