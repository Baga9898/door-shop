import { CgClose } from 'react-icons/cg';
import { useAppSelector } from '../../../redux/hook';

import styles from './modal.module.scss';

const Modal = ({ 
    children, 
    title, 
    isReg, 
    isOpen, 
    onCloseFunction, 
    firstAction, 
    secondAction, 
    firstText, 
    secondText,
    disabled,
}) => {
    const currentMode = useAppSelector(state => state.auth.authMode);

    const getSecondButtonText = () => {
        if (isReg) {
            if (currentMode === 'reg') {
                return 'Зарегистрироваться';
            } else if (currentMode === 'auth') {
                return 'Войти';
            }
        } else {
            return secondText;
        }
    };

    return (
        <div className={isOpen ? styles.backgroundOpen : styles.background}>
            <div className={styles.modal}>
                <CgClose 
                    title='Close' 
                    onClick={onCloseFunction}
                />
                {!isReg && (
                    <div className={styles.header}>
                        <h2>{ title }</h2>
                    </div>
                )}
                <div className={styles.body}>
                    { children }
                </div>
                <div className={styles.footer}>
                    <button onClick={firstAction ? firstAction : onCloseFunction}>{firstText ? firstText : 'отмена'}</button>
                    {(secondText || isReg) && <button disabled={disabled} onClick={secondAction}>{getSecondButtonText()}</button>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
