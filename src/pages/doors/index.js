import { useState, useEffect } from 'react';

import { setDoors }       from '../../redux/slices/catalogSlice';
import { useAppDispatch } from './../../redux/hook';
import { useAppSelector } from '../../redux/hook';
import Catalog            from './../../components/catalog/catalog';
import DoorsHeader        from '../../components/doorsHeader/doorsHeader';
import MainContainer      from '../../components/mainLayout/mainLayout';

export const getServerSideProps = async () => {
    const response = await fetch(`http://localhost:5000/api/doors`);
    const data = await response.json();

    return {
        props: { 
            serverDoors: data,
        },
    };
};

const Doors = ({ serverDoors }) => {
    const dispatch = useAppDispatch();
    const [localDoors, setLocalDoors] = useState(serverDoors);
    const storageDoors = useAppSelector(state => state.catalog.doors);

    useEffect(() => {
        dispatch(setDoors(localDoors));
    }, []);

    useEffect(() => {
        setLocalDoors(storageDoors);
    }, [storageDoors]);

    return (
        <MainContainer keywords="" title="Каталог">
            <DoorsHeader />
            <Catalog doors={localDoors} />
        </MainContainer>
    );
};

export default Doors;
