import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentMenu = history[history.length - 1];

    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            const isParentMenu = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParentMenu) setHistory((prev) => [...prev, item.children]);
                        onChange(item);
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            delay={[0, 700]}
            offset={[17,8]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <WrapperPopper>
                        {history.length > 1 && (
                            <Header
                                title={currentMenu.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, history.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </WrapperPopper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
