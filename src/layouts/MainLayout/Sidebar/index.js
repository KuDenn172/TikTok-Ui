import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Button outline large>
                Log In
            </Button>
            <h2>Sidebar</h2>
        </aside>
    );
}

export default Sidebar;
