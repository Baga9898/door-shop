import { useState, useEffect } from 'react';
import axios                   from "axios";

import EmptyCart from '../../components/emptyCart/emptyCart';
import MainContainer from "../../components/mainLayout/mainLayout";

const Cart = () => {
    const [cartDoors, setCartDoors] = useState();

    useEffect(() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        setCartDoors(localDoors);
    }, []);

    return (
        <MainContainer keywords="" title="Каталог">
                <h1>Корзина</h1>
                <div>
                    {cartDoors ? 
                        cartDoors.map(door => (
                            <div key={door._id}>
                                {door.name}
                            </div>
                        )) : <EmptyCart />
                    }
                </div>
        </MainContainer>
    );
};

export default Cart;
