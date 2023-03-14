import { Montserrat } from '@next/font/google';
import { useEffect }  from 'react';
import Link           from 'next/link';

import styles from './styles.module.scss';

const font = Montserrat({
    subsets: ['cyrillic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const ErrorFallback = ({ error, resetErrorBoundery }) => {
    useEffect(() => {
        // Отправка сообщение с заголовком ошибка. В тело передавать {error.message}.
        console.log(error.message);
    }, []);

  return (
    <div className={styles.errorFallback} style={font.style}>
        <p>Упс, похоже, что-то пошло не так</p>
        <p>Мы уже почти работаем над этим</p>
        {/* <pre>{error.message}</pre> */}
        <button onClick={() => location.reload()}>Вернуться назад</button>
    </div>
  )
}

export default ErrorFallback;
