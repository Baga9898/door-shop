// Refactoring need.
import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu }                 from 'react-icons/gi';
import { useState, useEffect, useRef }     from 'react';
import Link                                from 'next/link';

import { cartRoute }                      from './../../constants';
import { setAuthModalIsOpen }             from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from './../../redux/hook';
import { useOutsideClick }                from '../../hooks/useOutsideClick';
import * as INTL                          from '../../texts';
import AuthActions                        from './authActions/authActions';
import AuthRegModal                       from './authRegModal/authRegModal';

import styles from './headerActions.module.scss';

const HeaderActions = () => {
    const contactsRef = useRef();
    const [contactsIsShown, setContactsIsShown] = useOutsideClick(false, contactsRef);
    const { isAuth } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [currentWidth, setCurrentWidth] = useState(1200);
    const isBurgerMenuVisible = currentWidth <= 800; 

    useEffect(() => {
        const windowInnerWidth = document.documentElement.clientWidth;
        setCurrentWidth(windowInnerWidth);
    }, []);

    const openBurgerMenu = () => {

    };

    const openAuthModal = () => {
        dispatch(setAuthModalIsOpen(true));
    };

    const showContacts = () => {
        setContactsIsShown(!contactsIsShown);
    };

    return (
        <>
            {/* Вынести в отдельный компонент. */}
            <div className={styles.actions}> 
                {/* Вынести в отдельный компонент. */}
                {isBurgerMenuVisible && <GiHamburgerMenu onClick={openBurgerMenu} />}
                {/* Вынести в отдельный компонент. */}
                {isAuth ? <AuthActions /> : <FaUser onClick={openAuthModal} title={INTL.logInOut} />}
                {/* Вынести в отдельный компонент. */}
                <div ref={contactsRef} className={styles.contactsWrapper}>
                    <FaPhone title={INTL.contacts} onClick={showContacts}/>
                    <div className={contactsIsShown ? styles.contactsPopupActive : styles.contactsPopup}>
                        <a className={styles.phone} href={`tel: ${INTL.phoneNumber}`}>{INTL.phoneNumber}</a>
                        <a className={styles.mail} href={`mailto: ${INTL.mailAdress}`}>{INTL.mailAdress}</a>
                    </div>
                </div>
                {/* Вынести в отдельный компонент. */}
                <Link href={cartRoute}>
                    <FaShoppingCart title={INTL.cart} />
                </Link>
            </div>
            <AuthRegModal />
        </>
    );
};

export default HeaderActions;
