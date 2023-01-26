import styles   from './catalog.module.scss';
import CatalogItem from './catalogItem/catalogItem';

const Catalog = ({ doors }) => {
    return (
        <div className={styles.catalog}>
            {doors.map(door => (
                <CatalogItem door={door}/>
            ))}
        </div>
    );
};

export default Catalog;
