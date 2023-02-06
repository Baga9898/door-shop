import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';
import axios                               from 'axios';
import Link                                from 'next/link';

import { setAuthForm, setAuthModalIsOpen } from '../../redux/slices/authSlice';
import { setUser, logOut }                         from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector }  from './../../redux/hook';
import * as INTL                           from '../../texts';
import Modal                               from '../shared/modal/modal';
import RegModalContent                     from '../modalsContent/regModalContent/regModalContent';

import styles from './headerActions.module.scss';

const HeaderActions = () => {
    const { authModalIsOpen, authMode, authForm } = useAppSelector(state => state.auth);
    const { currentUser, isAuth } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setAuthModalIsOpen(true));
    };

    const closeModal = () => {
        dispatch(setAuthModalIsOpen(false));
    };

    const registration = async () => {
        try {
            await axios.post('http://localhost:5000/auth/registration', authForm)
            .then(() => {
                dispatch(setAuthForm({
                    username: '',
                    password: '',
                }));
                closeModal();
            });
        } catch (error) {
            console.log('Что - то пошло не так');
        }
    };

    const login = async () => {
        try {
            await axios.post('http://localhost:5000/auth/login', authForm)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(setUser(response.data.user));
                dispatch(setAuthForm({
                    username: '',
                    password: '',
                }));
                closeModal();
                console.log('Тут нотификация, что пользователь залогинился успешно и лоадер ещё не забыть.');
            });
        } catch (error) {
            console.log('Тут нотификация, что не удалось залогиниться.');
        }
    };

    const logout = async () => {
        dispatch(logOut());
    };

    const authReg = () => {
        if (authMode === 'auth') {
            login();
        } else if (authMode === 'reg') {
            registration();
        }
    };

    return (
        <>
            <div className={styles.actions}> 
                {isAuth ? <p onClick={logout}>{currentUser.username}</p> : <FaUser onClick={openModal} title={INTL.logInOut} />}
                <FaPhone title={INTL.contacts} />
                <Link href='/cart'>
                    <FaShoppingCart title={INTL.cart} />
                </Link>
            </div>
            <Modal
                isReg
                isOpen={authModalIsOpen}
                onCloseFunction={closeModal}
                secondAction={authReg}
            >
                <RegModalContent />
            </Modal>
        </>
    );
};

export default HeaderActions;
