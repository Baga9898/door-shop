import Image           from "next/image";
import MainContainer   from "../components/mainLayout/mainLayout";

const Index = () => {
    return (
        <MainContainer>
            <main className='main__wrapper'>
                <div className='main__slogan'>
                    <h1>Слоган и картинка</h1>
                    <p>Тут небольшая подпись</p>
                </div>
                <Image
                    src='/assets/main-screen-door.jpg'
                    alt='door main image'
                    width={1200}
                    height={600}
                />
            </main>
        </MainContainer>
    );
};

export default Index;
