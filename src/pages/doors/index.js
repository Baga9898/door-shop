import Catalog         from './../../components/catalog/catalog';
import MainContainer   from '../../components/mainLayout/mainLayout';
import { useState, useEffect } from 'react';

export const getServerSideProps = async () => {
    const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors`);
    const doors = await response.json();

    return {
        props: { doors },
    };
};

const Doors = ({ doors: serverDoors }) => {
    return (
        <MainContainer keywords="" title="Каталог">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Каталог</h1>
                <div>сортировка</div>
            </div>
            <Catalog doors={serverDoors} />
        </MainContainer>
    );
};

export default Doors;
