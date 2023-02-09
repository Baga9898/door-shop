import { catalogHeading } from '../../texts';
import SortSelect         from './sortSelect/sortSelect';

import styles from './doorsHeader.module.scss';

const DoorsHeader = () => {
    return (
        <div className={styles.doorsHeader}>
            <h1>{catalogHeading}</h1>
            <SortSelect />
        </div>
    );
};

export default DoorsHeader;
