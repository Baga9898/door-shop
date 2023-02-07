import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';
import Link                                from 'next/link';

import { cartRoute }                       from './../../constants';
import { setAuthModalIsOpen }              from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector }  from './../../redux/hook';
import * as INTL                           from '../../texts';
import AuthActions                         from './authActions/authActions';
import AuthRegModal                        from './authRegModal/authRegModal';

import styles from './headerActions.module.scss';

const HeaderActions = () => {
    const { isAuth } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setAuthModalIsOpen(true));
    };

    return (
        <>
            <div className={styles.actions}> 
                {isAuth ? <AuthActions /> : <FaUser onClick={openModal} title={INTL.logInOut} />}
                <FaPhone title={INTL.contacts} />
                <Link href={cartRoute}>
                    <FaShoppingCart title={INTL.cart} />
                </Link>
            </div>
            <AuthRegModal />
        </>
    );
};

export default HeaderActions;
