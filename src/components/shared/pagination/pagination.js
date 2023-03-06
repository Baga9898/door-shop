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

    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    const prevPage = () => {
        dispatch(setCurrentPage(currentPage - 1))
    };

    const nextPage = () => {
        dispatch(setCurrentPage(currentPage + 1))
    };

    const setPage = (page) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <ul className={styles.pagination}>
            {currentPage !== 1 && <li onClick={prevPage}>{'<'}</li>}
            {pageNumbers.map(page => (
                <li 
                    key={`page_${page}`}
                    onClick={() => setPage(page)}
                    className={page === currentPage && styles.active}
                >
                    {page}
                </li>
            ))}
            {currentPage !== pageCount && <li onClick={nextPage}>{'>'}</li>}
        </ul>
    );
};

export default Pagination;