import CatalogItem from './catalogItem/catalogItem';

import styles from './catalog.module.scss';

const Catalog = ({ doors }) => {
    return (
        <div className={styles.catalog}>
            {doors.map(door => (
                <CatalogItem key={door._id} door={door}/>
            ))}
        </div>
    );
};

export default Catalog;
