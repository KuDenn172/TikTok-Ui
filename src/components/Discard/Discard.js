import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './Discard.module.scss';
const cx = classNames.bind(styles);
const cloneFunc = () => {}
const Discard = ({ title, subTitle, textMainBtn, textSubBtn, onChangeVideo=cloneFunc, continueEdit = cloneFunc }) => {
    return (
        <>
            <div className={cx('title')}>{title}</div>
            {subTitle && <p className={cx('sub-title')}>{subTitle}</p>}
            <div className={cx('footer')}>
                <Button primary maxWidth onClick={onChangeVideo}>
                    {textMainBtn}
                </Button>
                <Button maxWidth onClick={continueEdit}>
                    {textSubBtn}
                </Button>
            </div>
        </>
    );
};
Discard.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    textMainBtn: PropTypes.string,
    textSubBtn: PropTypes.string,
};
export default Discard;
