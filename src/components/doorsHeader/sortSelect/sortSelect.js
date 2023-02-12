import { useRef } from 'react';

import { getSortedDoors, setSortMode }    from '../../../redux/slices/catalogSlice';
import { sortText }                       from '../../../texts';
import { useAppDispatch, useAppSelector } from './../../../redux/hook';
import { useOutsideClick }                from '../../../hooks/useOutsideClick';
import * as MODES                         from './selectModes';

import styles from './sortSelect.module.scss';

const SortSelect = () => {
    const selectModeRef = useRef();
    const dispatch = useAppDispatch();
    const currentSortMode = useAppSelector(state => state.catalog.sortMode);
    const [menuIsVisible, setMenuIsVisible] = useOutsideClick(false, selectModeRef);
    const sortClass = menuIsVisible ? styles.modeSelectWrapperOpen : styles.modeSelectWrapper;

    const setMode = (item) => {
        let value;
        switch (item) {
            case 'Новинки':
                value = 'new';
                break;
            case 'Премиум':
                value = 'expencive';
                break;
            case 'Бюджет':
                value = 'cheap';
                break;
        }

        dispatch(getSortedDoors(value));
        dispatch(setSortMode(item));
    };

    const showMode = () => {
        setMenuIsVisible(!menuIsVisible);
    };

    return (
        <div ref={selectModeRef} className={sortClass} onClick={showMode}>
            <p>{sortText}</p><span>{currentSortMode}</span>
            <ul>
                {MODES.allModes.map(item => (
                    <li key={item} onClick={() => setMode(item)}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default SortSelect;
