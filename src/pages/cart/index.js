// Refactoring need
import { useState, useEffect } from 'react';

import CartHeader    from '../../components/cartHeader/cartHeader';
import CartItem      from '../../components/cartItem/cartItem';
import CartOrder     from '../../components/cartOrder/cartOrder';
import EmptyCart     from '../../components/emptyCart/emptyCart';
import MainContainer from "../../components/mainLayout/mainLayout";

import styles from './styles.module.scss';

const Cart = () => {
    const [cartDoors, setCartDoors] = useState([]);

    useEffect(() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        setCartDoors(localDoors);
    }, []);

    return (
        <MainContainer keywords="" title="Корзина">
            <CartHeader setCartDoors={setCartDoors} />
            {cartDoors ? (
                <div className={styles.content}>
                    <div style={{width: '65%'}}>
                        {cartDoors.map((door, index) => (
                            <CartItem 
                                key={`${door._id}_${index}`} 
                                door={door} 
                                cartDoors={cartDoors}
                                setCartDoors={setCartDoors}
                            />
                        ))}
                    </div>
                    <CartOrder setCartDoors={setCartDoors} />
                </div>
            ) : <EmptyCart /> }
        </MainContainer>
    );
};

export default Cart;
