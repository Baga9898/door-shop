import { 
    faCartShopping, 
    faUser, 
    faPhone 
}                            from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';

import styles                from './headerActions.module.scss';

const HeaderActions = () => {
    return (
        <div className={styles.actions}> 
            {/* Все текстовки вынести в файлик текстовок */}
            <FontAwesomeIcon icon={faUser} title='Вход/Выход' />
            <FontAwesomeIcon icon={faPhone} title='Контакты' />
            <FontAwesomeIcon icon={faCartShopping} title='Корзина' />
        </div>
    )
}

export default HeaderActions;
