import MainContainer   from '../components/mainLayout/mainLayout';
import MainImage       from '../components/mainImage/mainImage';
import Newest          from '../components/newest/newest';

export const getStaticProps = async () => {
    const response = await fetch(`http://localhost:5000/api/doors/last-arrivals`);
    const doors = await response.json();

    return {
        props: { doors },
    };
};

const Index = ({ doors }) => {
    return (
        <MainContainer title='Двери Портал - Главная'>
            <MainImage />
            <Newest doors={doors}/>
        </MainContainer>
    );
};

export default Index;
