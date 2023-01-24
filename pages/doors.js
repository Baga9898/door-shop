import Link          from "next/link";

import MainContainer from "../components/mainLayout/mainLayout";

export const getStaticProps = async () => {
    const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors`);
    const doors = await response.json();

    return {
        props: { doors },
    };
};

const Doors = ({ doors }) => {
    return (
        <MainContainer>
            <h1>Список дверей</h1>
            <ul>
                {doors.map(door => (
                    <li>
                        <Link key={door.id} href={`/doors/${door.id}`}>{door.name}</Link>
                    </li>
                ))}
            </ul>
        </MainContainer>
    );
};

export default Doors;
