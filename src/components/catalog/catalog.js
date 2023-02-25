import CatalogItem from './catalogItem/catalogItem';

import styles from './catalog.module.scss';

const Catalog = ({ doors }) => {
    return (
        <div className={styles.catalog}>
            {doors.map((door, index) => (
                <CatalogItem key={`${door._id}_${index}`} door={door}/>
            ))}
        </div>
    );
};

export default Catalog;
