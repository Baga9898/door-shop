import { useRef } from 'react';
import axios      from 'axios';

import { setSortMode }                    from '../../../redux/slices/catalogSlice';
import { sortText }                       from '../../../texts';
import { useAppDispatch, useAppSelector } from './../../../redux/hook';
import { useOutsideClick }                from '../../../hooks/useOutsideClick';
import * as MODES                         from './selectModes';

import styles from './sortSelect.module.scss';

const SortSelect = () => {
    const currentSortMode = useAppSelector(state => state.catalog.sortMode);
    const dispatch = useAppDispatch();
    const selectModeRef = useRef();
    const [menuIsVisible, setMenuIsVisible] = useOutsideClick(false, selectModeRef);
    const sortClass = menuIsVisible ? styles.modeSelectWrapperOpen : styles.modeSelectWrapper;

    const getSortedDoors = async(sortMode) => {
        // Задиспатчить старт работы лоадера.
        try {
            await axios.post(`http://localhost:5000/api/doors/sort`, { sortMode })
            .then(response => { // Санка из редакса.
                // setLocalDoors(response.data);
            });
        } catch (error) {
            console.log(error);
        } finally {
            // Задиспатчить окончание работы лоадера.
        }
    };

    const setMode = (item) => {
        let value;
        switch (item) {
            case 'Новее':
                value = 'new';
                break;
            case 'Дороже':
                value = 'expencive';
                break;
            case 'Дешевле':
                value = 'cheap';
                break;
        }

        getSortedDoors(value);
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
