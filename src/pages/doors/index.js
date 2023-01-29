import { useState, useEffect }    from 'react';

import Catalog         from './../../components/catalog/catalog';
import MainContainer   from '../../components/mainLayout/mainLayout';
import axios from 'axios';
import DoorsHeader from '../../components/doorsHeader/doorsHeader';

export const getServerSideProps = async () => {
    const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors`);
    const data = await response.json();

    return {
        props: { 
            doors: data,
        },
    };
};

const Doors = ({ doors }) => {
    const [localDoors, setLocalDoors] = useState(doors);



    useEffect(() => {
        try {
            axios.get(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors`)
            .then((response) => {
                setLocalDoors(response.data);
            });
        } catch (error) {
            console.error(error);
        } 
    }, []);


    return (
        <MainContainer keywords="" title="Каталог">
            <DoorsHeader />
            <Catalog doors={localDoors} />
        </MainContainer>
    );
};

export default Doors;
