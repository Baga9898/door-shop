import Image           from "next/image";
import MainContainer   from "../components/mainLayout/mainLayout";

const Index = () => {
    return (
        <MainContainer>
            <Image
                src='/assets/main-door.jpg'
                alt='door main image'
                width={1200}
                height={800}
            />
        </MainContainer>
    );
};

export default Index;
