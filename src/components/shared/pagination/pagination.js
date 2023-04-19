import { useEffect } from 'react';

import { getSortedDoors } from './../../../redux/slices/catalogSlice';
import { setCurrentPage } from '../../../redux/slices/catalogSlice';
import { useAppDispatch } from './../../../redux/hook';
import { useAppSelector } from '../../../redux/hook';

import styles from './pagination.module.scss';

const Pagination = () => {
    const dispatch = useAppDispatch();
    const { currentPage, sortMode, doorsCount, pageSize } = useAppSelector(state => state.catalog);
    const pageCount = Math.ceil(doorsCount / pageSize);
    const pageNumbers = [];
    const firstPage = 1;
    const middlePage = Math.ceil(pageCount / 2);

    const scrollToTop = () => { // Вынести в хелперы.
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };

    useEffect(() => {
        dispatch(getSortedDoors({
            sortMode: sortMode,
            currentPage: currentPage,
            pageSize: pageSize,
        }));
        scrollToTop();
    }, [currentPage]);

    for (let i = 1; i <= pageCount; i++) { // Вынести в хелперы.
        pageNumbers.push(i);
    }

    const prevPage = () => {
        dispatch(setCurrentPage(currentPage - 1));
    };

    const nextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
    };

    const setPage = (page) => {
        dispatch(setCurrentPage(page));
    };

    const getPageNumbers = () => {
        if (pageCount <= 4) {
            return (
                pageNumbers.map(page => (
                    <li 
                        key={`page_${page}`}
                        onClick={() => setPage(page)}
                        className={page === currentPage && styles.active}
                    >
                        {page}
                    </li>
                ))
            );
        } else {
            return (
                <>
                    <li 
                        key={`page_${firstPage}`}
                        onClick={() => setPage(firstPage)}
                        className={currentPage === firstPage && styles.active}
                    >
                        {firstPage}
                    </li>
                    {currentPage !== firstPage && currentPage !== pageCount ? (
                            <>
                                <li>...</li>
                                <li 
                                    key={`page_${currentPage}`}
                                    onClick={() => setPage(currentPage)}
                                    className={currentPage === currentPage && styles.active}
                                >
                                    {currentPage}
                                </li>
                                <li>...</li>
                            </>
                        ) : (
                            <>
                                <li>...</li>
                                    <li 
                                        key={`page_${middlePage}`}
                                        onClick={() => setPage(middlePage)}
                                        className={middlePage === currentPage && styles.active}
                                    >
                                        {middlePage}
                                    </li>
                                <li>...</li>
                            </>
                        )   
                    } 
                    <li 
                        key={`page_${pageCount}`}
                        onClick={() => setPage(pageCount)}
                        className={currentPage === pageCount && styles.active}
                    >
                        {pageCount}
                    </li>
                </>
            );
        }
    };

    return (
        <ul className={styles.pagination}>
            {pageCount !== 1 && <button disabled={currentPage === 1} onClick={prevPage}>{'<'}</button>}
            {getPageNumbers()}
            {pageCount !== 1 && <button disabled={currentPage === pageCount} onClick={nextPage}>{'>'}</button>}
        </ul>
    );
};

export default Pagination;
