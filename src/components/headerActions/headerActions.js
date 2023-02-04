import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';
import Link                                from 'next/link';

import { useAppDispatch, useAppSelector } from './../../redux/hook';
import * as INTL       from '../../texts';
import Modal           from '../shared/modal/modal';
import RegModalContent from '../modalsContent/regModalContent/regModalContent';

import styles from './headerActions.module.scss';
import { setAuthModalIsOpen } from '../../redux/slices/authSlice';

const HeaderActions = () => {
    const isOpen = useAppSelector(state => state.auth.authModalIsOpen);
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setAuthModalIsOpen(true));
    };

    const closeModal = () => {
        dispatch(setAuthModalIsOpen(false));
    };

    return (
        <>
            <div className={styles.actions}> 
                <FaUser onClick={openModal} title={INTL.logInOut} />
                <FaPhone title={INTL.contacts} />
                <Link href='/cart'>
                    <FaShoppingCart title={INTL.cart} />
                </Link>
            </div>
            <Modal
                isReg
                isOpen={isOpen}
                onCloseFunction={closeModal}
            >
                <RegModalContent />
            </Modal>
        </>
    );
};

export default HeaderActions;
