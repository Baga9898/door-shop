import { CgClose }   from 'react-icons/cg';
import { useEffect } from 'react';

import { useAppSelector } from '../../../redux/hook';
import { useKeyPress }    from './../../../hooks/useKeyPress';

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
    const isModalClosed = useKeyPress('Escape'); // В константы.

    useEffect(() => {
        isModalClosed && onCloseFunction();
    }, [isModalClosed]);

    const getSecondButtonText = () => {
        if (isReg) {
            if (currentMode === 'reg') { // В константы.
                return 'Зарегистрироваться'; // В константы.
            } else if (currentMode === 'auth') { // В константы.
                return 'Войти'; // В константы.
            }
        } else {
            return secondText;
        }
    };

    return (
        <div className={isOpen ? styles.backgroundOpen : styles.background}>
            <div className={styles.modal}>
                <CgClose 
                    title='Close' // В константы.
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
                    {/* В константы. */}
                    <button onClick={firstAction ? firstAction : onCloseFunction}>{firstText ? firstText : 'отмена'}</button>
                    {(secondText || isReg) && <button disabled={disabled} onClick={secondAction}>{getSecondButtonText()}</button>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
