import { CgClose }                          from 'react-icons/cg';
import { useState, useEffect, useCallback } from 'react';
import axios                                from 'axios';
import Link                                 from 'next/link';

import { useDebounce } from './../../../hooks/useDebounce';
import { useKeyPress } from './../../../hooks/useKeyPress';
import Highlight       from '../highlight/highlight';

import styles from './styles.module.scss';

const GlobalSearch = ({ searchIsShown, setSearchIsShown }) => {
    const debounce = useDebounce();
    const [search, setSearch] = useState('');
    const [foundDoors, setFoundDoors] = useState([]);
    const isSearchClosed = useKeyPress('Escape');
    const basePath = process.env.NEXT_PUBLIC_API_LINK;
    const searchClassName = searchIsShown ? `${styles.globalSearch} ${styles.active}` : styles.globalSearch;

    const makeRequest = () => {
        // Вынести в санку.
        try {
            axios.post(`${basePath}/api/doors/search`, {searchText: search})
                .then(response => {
                    setFoundDoors(response.data);
                });
        } catch (error) {}
    };

    useEffect(() => {
        isSearchClosed && closeSearch();
    }, [isSearchClosed]);

    const handleSearch = (value) => {
        setSearch(value);
    };

    useEffect(() => {
        debounce(() => makeRequest());
    }, [search]);

    useEffect(() => {
        const globalSearchinput = document.querySelector('#globalSearch');
        globalSearchinput.focus();
    }, [searchIsShown]);

    const closeSearch = () => {
        setSearchIsShown(false);
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
                <input id='globalSearch' value={search} onChange={(e) => handleSearch(e.target.value)}/>
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
