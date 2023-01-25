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
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faPhone} />
            <FontAwesomeIcon icon={faCartShopping} />
        </div>
    )
}

export default HeaderActions;