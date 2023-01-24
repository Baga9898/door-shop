import Link from "next/link";

const Index = () => {
    return (
        <div>
            <Link href='/'>Главная</Link>
            <Link href='/doors'>двери</Link>
            <h1>Главная страница</h1>
        </div>
    );
};

export default Index;
