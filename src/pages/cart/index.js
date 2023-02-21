// Refactoring need
import { useState, useEffect } from 'react';

import CartHeader    from '../../components/cartHeader/cartHeader';
import CartItem      from '../../components/cartItem/cartItem';
import CartOrder     from '../../components/cartOrder/cartOrder';
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
                {cartDoors ? (
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '65%'}}>
                            {cartDoors.map(door => (
                                <CartItem 
                                    key={door._id} 
                                    door={door} 
                                    cartDoors={cartDoors}
                                />
                            ))}
                        </div>
                        <CartOrder />
                    </div>
                ) : <EmptyCart /> }
        </MainContainer>
    );
};

export default Cart;
