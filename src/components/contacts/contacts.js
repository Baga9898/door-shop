import { 
    mailAdress, 
    phoneNumber 
}               from '../../texts';

import styles   from './contacts.module.scss';

const Contacts = () => {
    return (
        <div className={styles.contacts}>
            <a className={styles.phone} href={`tel: ${phoneNumber}`}>{phoneNumber}</a>
            <a className={styles.mail} href={`mailto: ${mailAdress}`}>{mailAdress}</a>
        </div>
    );
};

export default Contacts;
