// Refactoring need.
import { CgClose }                         from 'react-icons/cg';
import { FaSearch }                        from 'react-icons/fa';
import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu }                 from 'react-icons/gi';
import { useState, useRef }                from 'react';
import Link                                from 'next/link';

import { cartRoute }                      from './../../constants';
import { setAuthModalIsOpen }             from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from './../../redux/hook';
import { useOutsideClick }                from '../../hooks/useOutsideClick';
import * as INTL                          from '../../texts';
import AuthActions                        from './authActions/authActions';
import AuthRegModal                       from './authRegModal/authRegModal';
import GlobalSearch                       from '../shared/globalSearch/globalSearch';
import Navigation                         from '../navigation/navigation';

import styles from './headerActions.module.scss';

const HeaderActions = () => {
    const contactsRef = useRef();
    const burgerRef = useRef();
    const [contactsIsShown, setContactsIsShown] = useOutsideClick(false, contactsRef);
    const [burgerIsShown, setBurgerIsShown] = useOutsideClick(false, burgerRef);
    const [searchIsShown, setSearchIsShown] = useState(false);
    const { isAuth } = useAppSelector(state => state.user);
    const cartDoors = useAppSelector(state => state.cart.cartDoors);
    const dispatch = useAppDispatch();

    const openAuthModal = () => {
        dispatch(setAuthModalIsOpen(true));
    };

    const showContacts = () => {
        setContactsIsShown(!contactsIsShown);
    };

    const showBurgerMenu = () => {
        setBurgerIsShown(!burgerIsShown);
    };

    const showSearchModal = () => {
        setSearchIsShown(!searchIsShown);
    };

    return (
        <>
            {/* Вынести в отдельный компонент. */}
            <div className={styles.actions}> 
                <div ref={burgerRef} className={styles.burgerWrapper}>
                    <GiHamburgerMenu className={styles.burgerMenuIcon} onClick={showBurgerMenu} />
                    <div className={burgerIsShown ? styles.burgerActive : styles.burger}>
                        <CgClose className={styles.burgerClose} onClick={showBurgerMenu} />
                        <Navigation />
                    </div>
                </div>
                <FaSearch onClick={showSearchModal} showSearchModal={showSearchModal} />
                {/* Вынести в отдельный компонент. */}
                {isAuth ? <AuthActions /> : <FaUser onClick={openAuthModal} title={INTL.logInOut} />}
                {/* Вынести в отдельный компонент. */}
                <div ref={contactsRef} className={styles.contactsWrapper}>
                    <FaPhone title={INTL.contacts} onClick={showContacts}/>
                    {/* Вынести в отдельный компонент. */}
                    {/* Написать универсальный компонент попапа. */}
                    <div className={contactsIsShown ? styles.contactsPopupActive : styles.contactsPopup}>
                        <a className={styles.phone} href={`tel: ${INTL.phoneNumber}`}>{INTL.phoneNumber}</a>
                        <a className={styles.mail} href={`mailto: ${INTL.mailAdress}`}>{INTL.mailAdress}</a>
                    </div>
                </div>
                {/* Вынести в отдельный компонент. */}
                <Link href={cartRoute} className={styles['cart-wrapper']}>
                    <FaShoppingCart title={INTL.cart} />
                    <div className={cartDoors.length ? styles['cart-doors-count-active'] : styles['cart-doors-count']}>{cartDoors.length}</div>
                </Link>
            </div>
            <AuthRegModal />
            <GlobalSearch searchIsShown={searchIsShown} setSearchIsShown={setSearchIsShown} />
        </>
    );
};

export default HeaderActions;
