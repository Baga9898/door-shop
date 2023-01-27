import { FaUser, FaPhone, FaShoppingCart } from 'react-icons/fa';

import * as INTL             from '../../texts';

import styles                from './headerActions.module.scss';

const HeaderActions = () => {
    return (
        <div className={styles.actions}> 
            <FaUser title={INTL.logInOut} />
            <FaPhone title={INTL.contacts} />
            <FaShoppingCart title={INTL.cart} />
        </div>
    )
}

export default HeaderActions;
