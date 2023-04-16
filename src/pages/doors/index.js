import { useState, useEffect } from 'react';

import { getDoorsCount, setDoors } from '../../redux/slices/catalogSlice';
import { useAppDispatch }          from './../../redux/hook';
import { useAppSelector }          from '../../redux/hook';
import Catalog                     from './../../components/catalog/catalog';
import DoorsHeader                 from '../../components/doorsHeader/doorsHeader';
import MainContainer               from '../../components/mainLayout/mainLayout';
import Pagination                  from './../../components/shared/pagination/pagination';

export const getStaticProps = async () => {
    const basePath = process.env.NEXT_PUBLIC_API_LINK;
    const response = await fetch(`${basePath}/api/doors`);
    const data = await response.json();

    return {
        props: { serverDoors: data },
        revalidate: 60,
    };
};

const Doors = ({ serverDoors }) => {
    const dispatch = useAppDispatch();
    const [localDoors, setLocalDoors] = useState(serverDoors);
    const { currentPage, doors } = useAppSelector(state => state.catalog);

    useEffect(() => {
        dispatch(setDoors(localDoors));
        dispatch(getDoorsCount());
    }, []);

    useEffect(() => {
        setLocalDoors(doors);
    }, [doors]);

    return (
        <MainContainer keywords="" title={`Каталог дверей страница ${currentPage}`}>
            <DoorsHeader />
            <Catalog doors={localDoors} />
            <Pagination />
        </MainContainer>
    );
};

export default Doors;
