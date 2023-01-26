import { 
    faCartShopping, 
    faUser, 
    faPhone 
}                            from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';

import * as INTL             from '../../texts';

import styles                from './headerActions.module.scss';

const HeaderActions = () => {
    return (
        <div className={styles.actions}> 
            <FontAwesomeIcon icon={faUser} title={INTL.logInOut} />
            <FontAwesomeIcon icon={faPhone} title={INTL.contacts} />
            <FontAwesomeIcon icon={faCartShopping} title={INTL.cart} />
        </div>
    )
}

export default HeaderActions;
