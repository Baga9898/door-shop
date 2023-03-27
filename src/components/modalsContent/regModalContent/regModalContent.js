// Refactoring need
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'
import { useState }                      from 'react';

import { setAuthForm, setAuthMode, setErrors } from '../../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector }      from './../../../redux/hook';

import styles from './styles.module.scss';

const RegModalContent = () => {
    const { authForm, authMode, errors } = useAppSelector(state => state.auth);
    const [inputType, setInputType] = useState('password');
    const dispatch = useAppDispatch();

    const isAuthMode = authMode === 'auth';
    const isRegMode  = authMode === 'reg';

    const usernameRegexp = /^(?![\d]+$)[а-яА-ЯёЁa-zA-Z0-9]*$/;
    const passwoerRegexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,32}/g;

    const toggleMode = (mode) => {
        dispatch(setAuthMode(mode));
    };

    const inputTypeSwitch = () => {
        setInputType(prevstate => prevstate === 'password' ? 'text' : 'password');
    };

    const setAuthNameValue = (value) => {
        // Debounce.
        if (usernameRegexp.test(value) || value.length === 0) {
            dispatch(setErrors({...errors, passwordError: ''}));
        } else {
            dispatch(setErrors({...errors, passwordError: 'Имя может содержать только буквы и цифры'})); // В константы.
        }

        dispatch(setAuthForm({ ...authForm, username: value }));
    };

    const setAuthPasswordValue = (value) => {
        // Debounce.
        if (passwoerRegexp.test(value) || value.length === 0) {
            dispatch(setErrors({...errors, passwordError: ''}));
        } else {
            dispatch(setErrors({...errors, passwordError: 'Пароль должен содержать хотябы один спец. символ, латинские буквы, как прописную, так и заглавную, и цифры'})); // В константы.
        }

        dispatch(setAuthForm({...authForm, password: value }));
    };

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <button 
                    className={isAuthMode && styles.active}
                    onClick={() => toggleMode('auth')}
                >
                    Авторизация
                </button>
                <button 
                    className={isRegMode && styles.active}
                    onClick={() => toggleMode('reg')}
                >
                    Регистрация
                </button>
            </div>
            <div className={styles.body}>
                <input 
                    value={authForm.username}
                    onChange={(e) => {setAuthNameValue(e.target.value)}}
                    placeholder='Логин'
                />
                {/* Реализовать кастомный компонент под инпут пароля. */}
                <div className={styles.passwordInput}>
                    <input 
                        type={inputType}
                        value={authForm.password}
                        onChange={(e) => {setAuthPasswordValue(e.target.value)}}
                        placeholder='Пароль'
                    />
                    {inputType === 'text' ?
                        <MdVisibility onClick={inputTypeSwitch} /> :
                        <MdVisibilityOff onClick={inputTypeSwitch} />
                    }
                </div>
                {errors.passwordError &&
                    <label>
                        {errors.passwordError}
                    </label>
                }
            </div>
        </div>
    );
};

export default RegModalContent;
