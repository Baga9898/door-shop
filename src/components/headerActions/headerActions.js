import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';
import { useRef }                          from 'react';
import Link                                from 'next/link';

import { cartRoute }                       from './../../constants';
import { setAuthModalIsOpen }              from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector }  from './../../redux/hook';
import { useOutsideClick }                 from '../../hooks/useOutsideClick';
import * as INTL                           from '../../texts';
import AuthActions                         from './authActions/authActions';
import AuthRegModal                        from './authRegModal/authRegModal';

import styles from './headerActions.module.scss';

const HeaderActions = () => {
    const contactsRef = useRef();
    const [contactsIsShown, setContactsIsShown] = useOutsideClick(false, contactsRef);
    const { isAuth } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const openAuthModal = () => {
        dispatch(setAuthModalIsOpen(true));
    };

    const showContacts = () => {
        setContactsIsShown(!contactsIsShown);
    };

    return (
        <>
            <div className={styles.actions}> 
                {isAuth ? <AuthActions /> : <FaUser onClick={openAuthModal} title={INTL.logInOut} />}
                {/* Вынести в отдельный компонент. */}
                <div ref={contactsRef} className={styles.contactsWrapper}>
                    <FaPhone title={INTL.contacts} onClick={showContacts}/>
                    <div className={contactsIsShown ? styles.contactsPopupActive : styles.contactsPopup}>
                        <a className={styles.phone} href={`tel: ${INTL.phoneNumber}`}>{INTL.phoneNumber}</a>
                        <a className={styles.mail} href={`mailto: ${INTL.mailAdress}`}>{INTL.mailAdress}</a>
                    </div>
                </div>
                <Link href={cartRoute}>
                    <FaShoppingCart title={INTL.cart} />
                </Link>
            </div>
            <AuthRegModal />
        </>
    );
};

export default HeaderActions;
