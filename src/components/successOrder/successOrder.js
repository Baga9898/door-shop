import { useDispatch }         from 'react-redux';
import { useRouter }           from 'next/router';
import { useState, useEffect } from 'react';

import { setIsOrderSuccess } from '../../redux/slices/cartSlice';

import styles from './styles.module.scss';

const SuccessOrder = () => {
    const [count, setCount] = useState(5);
    const router = useRouter();
    const dispatch = useDispatch();
  
    // Вынести в хук.
    useEffect(() => {
      setInterval(() => {
        setCount(prevState => prevState - 1);
      }, 1000);
  
      setTimeout (() => {
        router.push('/');
        dispatch(setIsOrderSuccess(false));
      }, 5000);
    }, []);

    return (
      <>
        <div className={styles.layer}></div>
        <div className={styles.successOrder}>
            <p>Благодарим вас за заказ, менеджер свяжется с вами в ближайшее время для подтверждения и уточнения необходимой информации</p>
            <p>Переход на главную страницу будет произведён автоматически через {count} секунд</p>
        </div>
      </> 
    );
};

export default SuccessOrder;
