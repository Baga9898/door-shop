import { CgClose }                          from 'react-icons/cg';
import { useState, useEffect, useCallback } from 'react';
import axios                                from 'axios';
import Link                                 from 'next/link';

import styles from './styles.module.scss';
import Highlight from '../highlight/highlight';

const GlobalSearch = ({ searchIsShown, showSearchModal }) => {
    const [search, setSearch] = useState('');
    const [foundDoors, setFoundDoors] = useState([]);
    const basePath = process.env.NEXT_PUBLIC_API_LINK;
    const searchClassName = searchIsShown ? `${styles.globalSearch} ${styles.active}` : styles.globalSearch;

    const handleSearch = (value) => {
        setSearch(value);
    };

    useEffect(() => {
        // Вынести в санку.
        try {
            axios.post(`${basePath}/api/doors/search`, {searchText: search})
                .then(response => {
                    setFoundDoors(response.data);
                });
        } catch (error) {}
    }, [search]);

    const closeSearch = () => {
        showSearchModal();
        setTimeout(() => {
            setSearch('');
        }, 500);
    };

    const foundLight = useCallback((str) => {
        return <Highlight filter={search} str={str} />;
    }, [search]);

    return (
        <div className={searchClassName}>
            {/* Вынести в сёрчбар компонент. */}
            <CgClose className={styles.closeButton} onClick={closeSearch} />
            {/* Вынести в сёрчбар компонент. */}
            <div className={styles.searchInputWrapper}>
                <input value={search} onChange={(e) => handleSearch(e.target.value)}/>
                <CgClose className={styles.resetSearch} onClick={() => setSearch('')} />
            </div>
            {/* Вынести в отдельный компонент. */}
            <div className={styles.foundDoors}>
                {/* Вынести в отдельный компонент. */}
                {foundDoors.map(door => (
                    <Link key={door._id} href={`/doors/${door._id}`}>
                        <div className={styles.foundItem} onClick={closeSearch}>
                            <img src={`${basePath}/${door.image}`} alt={door.name} />
                            <div className={styles.rightside}>
                                <p>Арт. {foundLight(door.article)}</p>
                                <p>{foundLight(door.name)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GlobalSearch;
