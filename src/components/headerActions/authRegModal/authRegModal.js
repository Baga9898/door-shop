import axios from 'axios';
import React from 'react';

import { setAuthForm, setAuthModalIsOpen } from '../../../redux/slices/authSlice';
import { setUser }                         from '../../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector }  from '../../../redux/hook';
import Modal                               from '../../shared/modal/modal';
import RegModalContent                     from '../../modalsContent/regModalContent/regModalContent';

const AuthRegModal = () => {
    const { authModalIsOpen, authMode, authForm } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(setAuthModalIsOpen(false));
    };

        // Вынести в отдельный файлик
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
    
        // Вынести в отдельный файлик
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
