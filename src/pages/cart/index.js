import { useState, useEffect } from 'react';
import axios                   from "axios";

import CartHeader    from '../../components/cartHeader/cartHeader';
import CartItem      from '../../components/cartItem/cartItem';
import EmptyCart     from '../../components/emptyCart/emptyCart';
import MainContainer from "../../components/mainLayout/mainLayout";

const Cart = () => {
    const [cartDoors, setCartDoors] = useState();

    useEffect(() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        setCartDoors(localDoors);
    }, []);

    return (
        <MainContainer keywords="" title="Корзина">
                <CartHeader setCartDoors={setCartDoors} />
                <div>
                    <div>
                        {cartDoors ? 
                            cartDoors.map(door => (
                                <CartItem 
                                    key={door._id} 
                                    door={door} 
                                />)) : <EmptyCart />
                        }
                    </div>
                    <div>
                        
                    </div>
                </div>
        </MainContainer>
    );
};

export default Cart;
