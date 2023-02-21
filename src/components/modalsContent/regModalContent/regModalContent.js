// Refactoring need
import { setAuthForm, setAuthMode }       from '../../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from './../../../redux/hook';

import styles from './styles.module.scss';

const RegModalContent = () => {
    const { authForm, authMode } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const isAuthMode = authMode === 'auth';
    const isRegMode  = authMode === 'reg';

    const toggleMode = (mode) => {
        dispatch(setAuthMode(mode));
    };

    const setAuthNameValue = (value) => {
        dispatch(setAuthForm({ ...authForm, username: value }));
    };

    const setAuthPasswordValue = (value) => {
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
                <input 
                    value={authForm.password}
                    onChange={(e) => {setAuthPasswordValue(e.target.value)}}
                    placeholder='Пароль'
                />
            </div>
        </div>
    );
};

export default RegModalContent;
