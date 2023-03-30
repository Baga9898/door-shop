// Refactoring need.
import { CgClose } from 'react-icons/cg';
import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu }                 from 'react-icons/gi';
import { useRef }                          from 'react';
import Link                                from 'next/link';

import { cartRoute }                      from './../../constants';
import { setAuthModalIsOpen }             from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from './../../redux/hook';
import { useOutsideClick }                from '../../hooks/useOutsideClick';
import * as INTL                          from '../../texts';
import AuthActions                        from './authActions/authActions';
import AuthRegModal                       from './authRegModal/authRegModal';
import Navigation from '../navigation/navigation';

import styles from './headerActions.module.scss';

const HeaderActions = () => {
    const contactsRef = useRef();
    const burgerRef = useRef();
    const [contactsIsShown, setContactsIsShown] = useOutsideClick(false, contactsRef);
    const [burgerIsShown, setBurgerIsShown] = useOutsideClick(false, burgerRef);
    const { isAuth } = useAppSelector(state => state.user);
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
                <Link href={cartRoute}>
                    <FaShoppingCart title={INTL.cart} />
                </Link>
            </div>
            <AuthRegModal />
        </>
    );
};

export default HeaderActions;
