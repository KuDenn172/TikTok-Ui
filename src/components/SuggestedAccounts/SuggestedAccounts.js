import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getData } from '~/utils/data/datafollowers';

import AccountItem from './AccountItem';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    let rows = 5;
    const [followers, setFollowers] = useState([]);
    const [hasMore, setHasMore] = useState([]);
    const [page, setPage] = useState(1);

    const handleHasMore = () => {
        setFollowers([...hasMore.slice(0, page * rows)]);
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        getData('followers')
            .then((data) => {
                setFollowers(data.slice(0, 5));
                setHasMore(data);
            })
            .catch((error) => {
                console.error(error);
            });
    },[]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {followers.map((video, index) => (
                <AccountItem key={video.id} data={video} />
            ))}

            <p className={cx('more-btn')} onClick={handleHasMore}>
                See all
            </p>
        </div>
    );
}
SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default SuggestedAccounts;
