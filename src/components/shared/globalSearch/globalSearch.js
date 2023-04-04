import { CgClose } from 'react-icons/cg';

import styles from './styles.module.scss';

const GlobalSearch = ({ searchIsShown, showSearchModal }) => {
    return (
        <div className={searchIsShown ? `${styles.globalSearch} ${styles.active}` : styles.globalSearch}>
            <CgClose className={styles.closeButton} onClick={showSearchModal} />
            <input />
        </div>
    );
};

export default GlobalSearch;
