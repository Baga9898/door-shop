import MainContainer   from '../components/mainLayout/mainLayout';
import MainImage       from '../components/mainImage/mainImage';
import Newest          from '../components/newest/newest';

export const getStaticProps = async () => {
    // На бэке создать оконечную точку по типу newest, откуда будут возвращаться 16 заключительных добавленных дверей.
    const response = await fetch(`http://localhost:5000/api/doors`);
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
