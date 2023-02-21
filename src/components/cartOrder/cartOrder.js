// Refactoring need
import { useState, useEffect } from 'react';

import styles from './styles.module.scss';

const CartOrder = () => {
    const [cartDoors, setCartDoors] = useState([]);
    const [orderForm, setOrderForm] = useState({
        customerName: '',
        customerPhone: '',
        customerMail: '',
    });

    useEffect(() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        setCartDoors(localDoors);
    }, []);

    const makeOrder = () => {
        console.log(orderForm);
    };

    return (
        <div className={styles.cartOrder}>
            {/* <p>Товаров в заказе: <span>{'3'}</span></p> */}
            {/* <p>Итого <span>{'1393'} &#8381;</span></p> */}
            <input 
                placeholder='Ваше имя' 
                value={orderForm.customerName}
                onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
            />
            <input 
                placeholder='Контактный телефон' 
                value={orderForm.customerPhone}
                onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})}
            />
            <input 
                placeholder='Почта для связи' 
                value={orderForm.customerMail}
                onChange={(e) => setOrderForm({...orderForm, customerMail: e.target.value})}
            />
            <button onClick={makeOrder}>Оформить заказ</button>
            <p>Дату доставки, стоимость монтажа и все оставшиеся у вас вопросы можно будет уточнить во время оформления заказа с менеджером по телефону</p>
        </div>
    );
};

export default CartOrder;
