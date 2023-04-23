// Refactoring need
import styles from './styles.module.scss';

const CartHeader = () => {
    const handleCartClear = () => {
        // delete all request here 
    };

    return (
        <div className={styles.cartHeader}>
            <h1>Корзина</h1>
            <button onClick={handleCartClear}>Очистить корзину</button>
        </div>
    );
};

export default CartHeader;
