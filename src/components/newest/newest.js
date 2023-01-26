import { latestArrivals }   from "../../texts";
import Catalog              from "../catalog/catalog";

import styles               from './newest.module.scss';

const Newest = ({ doors }) => {
    return (
        <div className={styles.mainNewest}>
            <h1>{latestArrivals}</h1>
            <Catalog doors={doors}/>
        </div>
    );
};

export default Newest;
