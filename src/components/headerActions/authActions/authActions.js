import { AiFillSetting } from 'react-icons/ai';
import { FaUser }        from 'react-icons/fa';
import Link              from 'next/link';
import React, { useRef } from 'react';

import { adminRoute }                     from '../../../constants';
import { logOut }                         from '../../../redux/slices/userSlice';
import { logoutButton }                   from '../../../texts';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { useOutsideClick }                from '../../../hooks/useOutsideClick';

import styles from '../headerActions.module.scss';

const AuthActions = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector(state => state.user);
    const userDropdownRef = useRef();
    const userContextMenuRef = useRef();
    const [userModalIsOpen, setUserModalIsOpen] = useOutsideClick(false, userDropdownRef);
    const [userContextModalIsOpen, setUserContextModalIsOpen] = useOutsideClick(false, userContextMenuRef);
    const userDropdownMode = userModalIsOpen ? styles.userModalActive : styles.userModal;
    const userContextMenuMode = userContextModalIsOpen ? styles['user-context-menu-active'] : styles['user-context-menu'];
    const isAdmin = currentUser.roles.includes('admin');

    const usernameClickHandler = () => {
        setUserModalIsOpen(true);
    };

    const logout = async () => {
        dispatch(logOut());
        setUserModalIsOpen(false);
    };

    const openUserContextMenu = () => {
        setUserContextModalIsOpen(true);
    };

    return (
        <>
            <div ref={userDropdownRef} className={styles.userModalWrapper}>
                <p className={styles.username} onClick={usernameClickHandler}>{currentUser.username}</p>
                <ul className={userDropdownMode}>
                    <li onClick={logout}>{logoutButton}</li>
                </ul>
            </div>
            <div ref={userContextMenuRef} className={styles['user-context-wrapper']}>
                <FaUser onClick={openUserContextMenu} className={styles['user-context-icon']} title='User menu' />
                <ul className={userContextMenuMode}>
                    <li>{currentUser.username}</li>
                    <li onClick={logout}>{logoutButton}</li>
                </ul>
            </div>
            {isAdmin && (
                <Link href={adminRoute}>
                    <AiFillSetting />
                </Link>
            )}
        </>
    );
};

export default AuthActions;
