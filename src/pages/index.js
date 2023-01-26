import Image           from "next/image";
import Link from "next/link";
import MainContainer   from "../components/mainLayout/mainLayout";

export const getServerSideProps = async ({ params }) => {
    const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors`);
    const doors = await response.json();
  
    return {
        props: { doors },
    };
  };

const Index = ({ doors }) => {
    return (
        <MainContainer>
            <main className="main__wrapper">
                {/* В отдельный компонент */}
                <div className="main__image">
                {/* В отдельный компонент */}
                    <div className="main__slogan">
                        <h1>Слоган и картинка</h1>
                        {/* Все текстовки вынести в файлик текстовок */}
                        <p>Тут небольшая подпись</p>
                    </div>
                    <Image
                        src='/assets/main-screen-door.jpg'
                        alt='door main image'
                        width={1200}
                        height={600}
                    />
                    {/* В отдельный компонент */}
                    {/* Все роуты вынести в файлик кнстант */}
                    <Link href='/doors'>
                        {/* Все текстовки вынести в файлик текстовок */}
                        <button>каталог</button>
                    </Link>
                </div>
                {/* В отдельный компонент */}
                <div className="main__newest">
                    {/* Все текстовки вынести в файлик текстовок */}
                    <h1>Последние поступления</h1>
                    <div className="catalog">
                        {/* В отдельный компонент, добавить возможность выбора фильтра, 
                        тем самым создав универсальный компонент и для главной страницы 
                        с новинками и для каталога */}
                        {doors.map(door => (
                            <Link href={`/doors/${door.id}`} className="doorCard" >
                                <img src={door.image} />
                                <p>{door.name}</p>
                                <p className="price">{door.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </MainContainer>
    );
};

export default Index;
