import styles from './styles.module.scss';

const CartHeader = ({ setCartDoors }) => {
    const handleCartClear = () => {
        localStorage.removeItem('cartDoors');
        setCartDoors(null);
    };

    return (
        <div className={styles.cartHeader}>
            <h1>Корзина</h1>
            <button onClick={handleCartClear}>Очистить корзину</button>
        </div>
    );
};

export default CartHeader;
