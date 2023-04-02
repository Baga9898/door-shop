// Refactoring need
import { useState, useEffect } from 'react';

import { useAppSelector } from '../../redux/hook';
import CartHeader         from '../../components/cartHeader/cartHeader';
import CartItem           from '../../components/cartItem/cartItem';
import CartOrder          from '../../components/cartOrder/cartOrder';
import EmptyCart          from '../../components/emptyCart/emptyCart';
import MainContainer      from '../../components/mainLayout/mainLayout';
import SuccessOrder       from '../../components/successOrder/successOrder';

import styles from './styles.module.scss';

const Cart = () => {
    const [cartDoors, setCartDoors] = useState([]);
    const isOrderSuccess = useAppSelector(state => state.cart.isOrderSuccess);

    useEffect(() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        setCartDoors(localDoors);
    }, []);

    return (
        // В константы, подкатегорию page titles.
        <MainContainer title='Двери Портал - корзина'>
            <CartHeader setCartDoors={setCartDoors} />
            {isOrderSuccess ? <SuccessOrder /> : (
                cartDoors && cartDoors.length !== 0 ? (
                    <div className={styles.content}>
                        <div className={styles.cartItem}>
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
                ) : <EmptyCart /> 
            )}
        </MainContainer>
    );
};

export default Cart;
