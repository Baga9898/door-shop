import axios from 'axios';
import React from 'react';

import { logOut, setUser }                 from '../../../redux/slices/userSlice';
import { notify }                          from '../../shared/notify/notify';
import { setAuthForm, setAuthModalIsOpen } from '../../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector }  from '../../../redux/hook';
import Modal                               from '../../shared/modal/modal';
import RegModalContent                     from '../../modalsContent/regModalContent/regModalContent';

const AuthRegModal = () => {
    const { authModalIsOpen, authMode, authForm } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const basePath = process.env.NEXT_PUBLIC_API_LINK;

    const closeModal = () => {
        dispatch(setAuthModalIsOpen(false));
    };

        // Вынести в отдельный файлик (В санки).
        const registration = async () => {
            try {
                await axios.post(`${basePath}/auth/registration`, authForm)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    dispatch(setUser(response.data.user));
                    dispatch(setAuthForm({
                        username: '',
                        password: '',
                    }));
                    closeModal();
                    notify('success', 'Пользователь успешно зарегестрирован');
                });
            } catch (error) {
                dispatch(logOut());
                notify('error', 'При регистрации возникла ошибка');
            }
        };
    
        // Вынести в отдельный файлик (В санки).
        const login = async () => {
            try {
                await axios.post(`${basePath}/auth/login`, authForm)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    dispatch(setUser(response.data.user));
                    dispatch(setAuthForm({
                        username: '',
                        password: '',
                    }));
                    closeModal();
                    notify('success', 'Пользователь успешно автроизован'); // Все текстовки вынести в константы.
                });
            } catch (error) {
                dispatch(logOut());
                notify('error', 'При авторизации возникла ошибка');
            }
        };

    const authReg = () => {
        authMode === 'auth' && login();
        authMode === 'reg' && registration();
    };

    return (
        <Modal
            isReg
            isOpen={authModalIsOpen}
            onCloseFunction={closeModal}
            secondAction={authReg}
        >
            <RegModalContent />
        </Modal>
    );
};

export default AuthRegModal;
