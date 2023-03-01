// Refactoring need
import { useState, useEffect } from 'react';
import axios                   from 'axios';

import { notify } from '../shared/notify/notify';

import styles from './styles.module.scss';

const CartOrder = ({ setCartDoors }) => {
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [mailError, setMailError] = useState('');
    const [orderForm, setOrderForm] = useState({
        customerName: '',
        customerPhone: '',
        customerMail: '',
    });

    const phoneRegexp = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g;
    const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    // Сделать компонент поля, где также будет приниматься регулярка, и генериться ерроры.
    useEffect(() => {
        /^[а-яА-ЯёЁ ]+$/.test(orderForm.customerName) || orderForm.customerName.length === 0 ? 
            setNameError('') : 
            setNameError('Для ввода доступны только буквы русского алфавита');
    }, [orderForm.customerName]);

    // Сделать нормальный импорт.
    useEffect(() => {
        phoneRegexp.test(orderForm.customerPhone) ||
        orderForm.customerPhone.length === 0 ?
        setPhoneError('') : 
        setPhoneError('Номер должен соответствовать формату: 89169999999');
    }, [orderForm.customerPhone]);

    useEffect(() => {
        emailRegexp.test(orderForm.customerMail) || orderForm.customerMail.length === 0 ?
        setMailError('') :
        setMailError('Почта должна соответствовать формату: qwerty@mail.ru');
    }, [orderForm.customerMail]);

    const makeOrder = async() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        const objectsForBack = localDoors.map(door => ({
            article: door.article,
            name: door.name,
            size: door.chosenSize,
            price: door.price,
            count: door.count,
        }));

        // Добавить лоадер.

        try {
            await axios.post('http://localhost:5000/api/mail', {
                ...orderForm,
                doors: objectsForBack,
            });
            localStorage.removeItem('cartDoors');
            setCartDoors([]);
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

    const haveErrors = nameError 
        || phoneError 
        || mailError 
        || orderForm.customerName.length === 0 
        || orderForm.customerPhone.length === 0;

    return (
        <div className={styles.cartOrder}>
            {/* <p>Товаров в заказе: <span>{'3'}</span></p> */}
            {/* <p>Итого <span>{'1393'} &#8381;</span></p> */}
            <input 
                placeholder='Ваше имя' 
                value={orderForm.customerName}
                onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
            />
            <label>{nameError}</label>
            <input 
                placeholder='Контактный телефон' 
                value={orderForm.customerPhone}
                onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})}
            />
            <label>{phoneError}</label>
            <input 
                placeholder='Почта для связи' 
                value={orderForm.customerMail}
                onChange={(e) => setOrderForm({...orderForm, customerMail: e.target.value})}
            />
            <label>{mailError}</label>
            <button disabled={haveErrors} onClick={makeOrder}>Оформить заказ</button>
            <p>Дату доставки, стоимость монтажа и все оставшиеся у вас вопросы можно будет уточнить во время оформления заказа с менеджером по телефону</p>
        </div>
    );
};

export default CartOrder;
