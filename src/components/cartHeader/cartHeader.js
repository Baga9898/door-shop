// Refactoring need
import axios from 'axios';

import { setEmptyCart }   from '../../redux/slices/cartSlice';
import { useAppDispatch } from './../../redux/hook';
import { useAppSelector } from '../../redux/hook';

import styles from './styles.module.scss';

const CartHeader = () => {
    const dispatch = useAppDispatch();
    const uniqueUserId = useAppSelector(state => state.app.uniqueUserId);
    const basePath = process.env.NEXT_PUBLIC_API_LINK;

    const handleCartClear = () => {
        try {
            axios.put(`${basePath}/api/cart/clear/${uniqueUserId}`)
                .then(() => {
                    dispatch(setEmptyCart());
                });
        } catch (error) {}
    };

    return (
        <div className={styles.cartHeader}>
            <h1>Корзина</h1>
            <button onClick={handleCartClear}>Очистить корзину</button>
        </div>
    );
};

export default CartHeader;
