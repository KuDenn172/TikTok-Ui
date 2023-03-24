import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faEllipsisV, faGear, faPlus, faSignOut, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard, faQuestionCircle, faUser } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Images';
import Search from '../Search';
import { Link } from 'react-router-dom';
import config from '~/config';
import Login from '~/components/Login';
import Modal from '~/components/Modal';
import { useState } from 'react';
import SignUp from '~/components/Login/SignUp';
import { useAuth } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];
const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoso',
    },
    {
        icon: <FontAwesomeIcon icon={faVideo} />,
        title: 'LIVE Studio',
        to: '/studio',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/setting',
    },

    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        // to: '/logout',
        separate: true,
    },
];

function Header() {
    const [openModal, setOpenModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const { currentUser, logout } = useAuth();
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break;

            default:
                break;
        }
    };

    async function handleLogout(e) {
        await logout()
            .then(() => {
                // Đăng xuất thành công
            })
            .catch((error) => {
                // Xử lý lỗi đăng xuất
                console.log(error);
            });
        window.location.reload();
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img className={cx('logo')} src={images.logo} alt="Logo Titok" />
                </Link>

                {/* Search */}
                <Search />

                {/* Action */}
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload Video">
                                <Link className={cx('action-btn')} to={config.routes.upload}>
                                    <UploadIcon />
                                </Link>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Message">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Inbox">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button
                                leftIcon={<FontAwesomeIcon icon={faPlus} to={config.routes.upload} />}
                                onClick={() => setOpenModal(!openModal)}
                            >
                                Upload
                            </Button>
                            <Button primary onClick={() => setOpenModal(!openModal)}>
                                {' '}
                                Log in
                            </Button>

                            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                                {isLogin ? (
                                    <Login onClick={() => setIsLogin(false)} />
                                ) : (
                                    <SignUp onClick={() => setIsLogin(true)} />
                                )}
                            </Modal>
                        </>
                    )}

                    <Menu
                        items={currentUser && currentUser.email ? MENU_ITEMS : userMenu}
                        onChange={handleMenuChange}
                        onLogout={handleLogout}
                    >
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/9a059bc23a2073efc81dbc66a80a798b~c5_100x100.jpeg?x-expires=1677139200&x-signature=4TvDW6B43jOaacLYp6O6vJdEsho%3D"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
