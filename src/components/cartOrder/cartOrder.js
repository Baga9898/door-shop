import styles from './styles.module.scss';

const CartOrder = () => {
    return (
        <div className={styles.cartOrder}>
            <p>Товаров в заказе: <span>3</span></p>
            <p>Итого <span>1393 &#8381;</span></p>
            <input placeholder='Ваше имя' />
            <input placeholder='Контактный телефон' />
            <input placeholder='Почта для связи' />
            <button>Оформить заказ</button>
            <p>Дату доставки, стоимость монтажа и все оставшиеся у вас вопросы можно будет уточнить во время оформления заказа с менеджером по телефону</p>
        </div>
    );
};

export default CartOrder;
