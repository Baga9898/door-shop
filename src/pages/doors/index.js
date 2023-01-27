import Link          from "next/link";

import MainContainer from "../../components/mainLayout/mainLayout";
import Catalog from './../../components/catalog/catalog';

export const getStaticProps = async () => {
    const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors`);
    const doors = await response.json();

    return {
        props: { doors },
    };
};

const Doors = ({ doors }) => {
    return (
        <MainContainer keywords="" title="Каталог">
            <Catalog doors={doors} />
        </MainContainer>
    );
};

export default Doors;
