import Contacts from '../../contacts/contacts';
import Social   from '../../social/social';

import styles   from './rightside.module.scss';

const Rightside = () => {
    return (
        <div className={styles.rightside}>
            <Contacts />
            <Social />
        </div>
    );
};

export default Rightside;