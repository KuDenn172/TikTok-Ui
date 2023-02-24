import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../Images';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderResult = (attrs) => (
        <div className={cx('preview')} tabIndex="-1" {...attrs}>
            <WrapperPopper>
                <AccountPreview />
            </WrapperPopper>
        </div>
    );

    return (
        <div>
            <Tippy  delay={[800, 0]} interactive placement="bottom" offset={[-30,2]} render={renderResult}>
                <Link to={``} className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/60946ad67b89bda1c64b9e92a66022a7.jpeg?x-expires=1677330000&x-signature=eVHf2iPPWtOqEdIdPTqB22IwpC4%3D"
                        alt=""
                    />
                    <div className={cx('info')}>
                        <h4 className={cx('nickname')}>
                            <span>mihye02</span>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </h4>
                        <span className={cx('name')}>Mihye</span>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}
AccountItem.propTypes = {};
export default AccountItem;
