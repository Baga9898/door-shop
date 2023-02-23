// Refactoring need
import { useState, useEffect } from 'react';
import axios                   from 'axios';

import { notify }         from '../shared/notify/notify';
import { useAppDispatch } from './../../redux/hook';

import styles from './styles.module.scss';
import { setCartDoors } from '../../redux/slices/catalogSlice';

const CartOrder = () => {
    const dispatch = useAppDispatch();
    const [orderForm, setOrderForm] = useState({
        customerName: '',
        customerPhone: '',
        customerMail: '',
    });

    useEffect(() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        // dispatch(setCartDoors(localDoors));
    }, []);

    const makeOrder = async() => {
        try {
            await axios.post('http://localhost:5000/api/mail', orderForm);
            localStorage.removeItem('cartDoors');
            setOrderForm({
                customerName: '',
                customerPhone: '',
                customerMail: '',
            });
            notify('success', 'Заказ оформлен успешно');
        } catch (error) {
            notify('error', 'При оформлении заказа возникла ошибка');
        }
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
