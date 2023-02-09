import { AiFillSetting } from 'react-icons/ai';
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
    const [userModalIsOpen, setUserModalIsOpen] = useOutsideClick(false, userDropdownRef);
    const userDropdownMode = userModalIsOpen ? styles.userModalActive : styles.userModal;
    const isAdmin = currentUser.roles.includes('admin');

    const usernameClickHandler = () => {
        setUserModalIsOpen(true);
    };

    const logout = async () => {
        dispatch(logOut());
        setUserModalIsOpen(false);
    };

    return (
        <>
            <div ref={userDropdownRef} className={styles.userModalWrapper}>
                <p onClick={usernameClickHandler}>{currentUser.username}</p>
                <ul className={userDropdownMode}>
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
