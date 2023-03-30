import MainContainer   from '../components/mainLayout/mainLayout';
import MainImage       from '../components/mainImage/mainImage';
import Newest          from '../components/newest/newest';

export const getStaticProps = async () => {
    const basePath = process.env.NEXT_PUBLIC_API_LINK;
    const response = await fetch(`${basePath}/api/doors/last-arrivals`);
    const doors = await response.json();

    return {
        props: { doors },
        revalidate: 60,
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
