import MainContainer from '../components/mainLayout/mainLayout';
import MainImage     from '../components/mainImage/mainImage';
import Newest        from '../components/newest/newest';
import PageDownSide  from '../components/pageDownSide/pageDownSide';

export const getStaticProps = async () => {
    const basePath = process.env.NEXT_PUBLIC_API_LINK;
    const response = await fetch(`${basePath}/api/doors/last-arrivals`); // Вынести в константы, по типу файлик апи констант, где будет корень из окружения, и дополнения.
    const doors = await response.json();

    return {
        props: { doors },
        revalidate: 60,
    }; 
};

const Index = ({ doors }) => {
    return (
        // Тайтл в константы.
        <MainContainer title='Двери Портал - Главная'>
            <MainImage />
            <Newest doors={doors}/>
            <PageDownSide />
        </MainContainer>
    );
};

export default Index;
