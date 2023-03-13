// Refactoring need
import { useState, useEffect } from 'react';
import axios                   from 'axios';

import { notify } from '../shared/notify/notify';

import styles from './styles.module.scss';
import { type } from './../../redux/store';

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
    const emailRegexp = /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

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
        setPhoneError('Номер должен соответствовать формату: 8 (916) 999-99-99');
    }, [orderForm.customerPhone]);

    useEffect(() => {
        emailRegexp.test(orderForm.customerMail) || orderForm.customerMail.length === 0 ?
        setMailError('') :
        setMailError('Почта должна соответствовать формату: example@mail.ru');
    }, [orderForm.customerMail]);

    const makeOrder = async() => {
        const localDoors = JSON.parse(localStorage.getItem('cartDoors'));
        const objectsForBack = localDoors.map(door => ({
            article: door.article,
            name: door.name,
            size: door.chosenSize,
            price: door.price,
            count: door.count,
            direction: door.direction,
        }));

        // Добавить лоадер.

        try {
            await axios.post('http://localhost:5000/api/mail', {
                ...orderForm,
                doors: objectsForBack,
            });
            localStorage.removeItem('cartDoors');
            setCartDoors();
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

    const getNumbersValue = (input) => {
        return input.value.trim().replace(/\D/g, '');
    };

    const onPhoneInput = (e) => {
        let input = e.target,
            inputNumbersValue = getNumbersValue(input),
            formatedInputValue = '';
            
        if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) { // Вынести в utils.
            // Russian number
            if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] == '8') ? '8' : '+7';
            formatedInputValue = firstSymbols + ' ';
            if (inputNumbersValue.length > 1) {
                formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            // Not Russian number
            formatedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        setOrderForm({...orderForm, customerPhone: formatedInputValue});
    };

    const onPhoneKeyDown = (e) => {
        if (e.keyCode === 8 && getNumbersValue(e.target).length === 1) {
            setOrderForm({...orderForm, customerPhone: ''});
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
            <div className={styles.inputWrapper}>
                <input 
                    placeholder='Ваше имя' 
                    value={orderForm.customerName}
                    onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                />
                <label className={nameError && styles.active}>{nameError}</label>
            </div>
            <div className={styles.inputWrapper}>
                <input 
                    type='tel'
                    maxLength={18}
                    placeholder='Контактный телефон' 
                    value={orderForm.customerPhone}
                    onChange={(e) => onPhoneInput(e)}
                    onKeyDown={(e) => onPhoneKeyDown(e)}
                />
               <label className={phoneError && styles.active}>{phoneError}</label>
            </div>
            <div className={styles.inputWrapper}>
                <input 
                    placeholder='Почта для связи' 
                    value={orderForm.customerMail}
                    onChange={(e) => setOrderForm({...orderForm, customerMail: e.target.value})}
                />
                <label className={mailError && styles.active}>{mailError}</label>
            </div>
            <button disabled={haveErrors} onClick={makeOrder}>Оформить заказ</button>
            <p>Дату доставки, стоимость монтажа и все оставшиеся у вас вопросы можно будет уточнить во время оформления заказа с менеджером по телефону</p>
        </div>
    );
};

export default CartOrder;
