import { useState, useEffect }   from 'react';

import { API }                   from '../../axios/instance';
import { useAppDispatch }        from './../../redux/hook';
import { useAppSelector }        from '../../redux/hook';
import Catalog                   from './../../components/catalog/catalog';
import DoorsHeader               from '../../components/doorsHeader/doorsHeader';
import MainContainer             from '../../components/mainLayout/mainLayout';

export const getServerSideProps = async () => {
    const response = await fetch(`http://localhost:5000/api/doors`);
    const data = await response.json();

    return {
        props: { 
            serverDoors: data,
        },
    };
};

    // На бэке реализовать оконечную точку, принимающую параметры в виде типа сортировки и возвращающую на фронт отсортированный список.


const Doors = ({ serverDoors }) => {
    const [localDoors, setLocalDoors] = useState(serverDoors);
    const { sortMode } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    const getSortedDoors = () => {
        // Задиспатчить старт работы лоадера.

        // Написать роут на бэке, принимающий пост запрос с параметром сортировки, в зависимости от которорого возвращает отсортированный массив.
        try {
            API.get('/doors')
            .then(response => {
                setLocalDoors(response.data);
            });
        } catch (error) {
            console.log('Some wents wrong!');
        } finally {
            // Задиспатчить окончание работы лоадера.
        }
    };

    // useEffect(() => {
    //     getSortedDoors();
    // }, [sortMode]);

    return (
        <MainContainer keywords="" title="Каталог">
            <DoorsHeader />
            <Catalog doors={localDoors} />
        </MainContainer>
    );
};

export default Doors;
