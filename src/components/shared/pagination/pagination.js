import { useState } from 'react';

import styles from './pagination.module.scss';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <ul className={styles.pagination}>
            {currentPage !== 1 && <li>{'<'}</li>}
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>{'>'}</li>
        </ul>
    );
};

export default Pagination;