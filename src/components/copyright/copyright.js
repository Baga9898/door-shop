import { copyright }   from '../../texts';

import styles          from './copyright.module.scss';

const Copyright = () => {
    const currentYear = new Date().getFullYear(); 

    return (
        <div className={styles.copyright}>&#169; {copyright} {currentYear}</div>
    );
};

export default Copyright;
