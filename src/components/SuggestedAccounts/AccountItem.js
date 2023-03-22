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
                <AccountPreview dataPreview={data} />
            </WrapperPopper>
        </div>
    );

    return (
        <div>
            <Tippy delay={[800, 0]} interactive placement="bottom" offset={[-30, 2]} render={renderResult}>
                <Link to={``} className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.unique_id} />
                    <div className={cx('info')}>
                        <h4 className={cx('nickname')}>
                            <span>{data.nickname}</span>
                            {data.verified && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </h4>
                        <span className={cx('name')}>{data.unique_id}</span>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
}
AccountItem.propTypes = {};
export default AccountItem;
