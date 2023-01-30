import MainContainer   from '../components/mainLayout/mainLayout';
import MainImage       from '../components/mainImage/mainImage';
import Newest          from '../components/newest/newest';

export const getStaticProps = async () => {
    // На бэке создать оконечную точку по типу newest, откуда будут возвращаться 16 заключительных добавленных дверей.
    const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors`);
    const doors = await response.json();

    return {
        props: { doors },
    };
};

const Index = ({ doors }) => {
    return (
        <MainContainer>
            <MainImage />
            <Newest doors={doors}/>
        </MainContainer>
    );
};

export default Index;
