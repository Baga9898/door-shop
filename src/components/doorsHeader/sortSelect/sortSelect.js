// import { useDispatch, useSelector }      from 'react-redux';
import { useRef, useState, useEffect }   from 'react';

import * as MODES                        from './selectModes';

import styles from './sortSelect.module.scss';

const SortSelect = () => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    // const currentItem = useSelector(state => state.warehouse.mode);
    const selectModeRef = useRef();
    // const dispatch = useDispatch();

    useEffect(() => {
        if (!menuIsVisible) return;
        const handleClick = (event) => {
          if (selectModeRef.current && !selectModeRef.current.contains(event.target)) {
            setMenuIsVisible(false);
          }
        }
        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
      }, [menuIsVisible]);

    // const setMode = (item) => {
    //     dispatch({ type: 'SET_MODE', payload: item})
    // }

    const showMode = () => {
        setMenuIsVisible(!menuIsVisible);
    }

    return (
        <div ref={selectModeRef} className={menuIsVisible ? styles.modeSelectWrapperOpen : styles.modeSelectWrapper} onClick={showMode}>
            <p>Сортировка: <span>{MODES.allModes[0]}</span></p>
            <ul>
                {MODES.allModes.map(item => (
                    <li key={item} onClick={() => setMode(item)}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default SortSelect;
