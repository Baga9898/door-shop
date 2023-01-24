import { useState } from "react";
import Link         from "next/link";

const Doors = () => {
    const [doors, setDoors] = useState([
        {id: 1, name: 'qwer'},
        {id: 2, name: 'asdf'},
    ]);

    return (
        <div>
            <h1>Список дверей</h1>
            <ul>
                {doors.map(door => (
                    <li>
                        <Link key={door.id} href={`/doors/${door.id}`}>{door.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Doors;
