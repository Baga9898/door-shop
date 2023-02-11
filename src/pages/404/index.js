import { Montserrat }          from '@next/font/google';
import { useEffect, useState } from "react";
import { useRouter }           from "next/router";

const font = Montserrat({
  subsets: ['cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const Page404 = () => {
  const [count, setCount] = useState(5);
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      setCount(prevState  => prevState - 1);
    }, 1000);

    setTimeout (() => {
      router.push('/');
    }, 5000);
  }, []);
 

  return (    
  <div style={font.style} className='not-found-page'>
    <span>404</span>
    <span></span>
    <div className='not-found-page__message'>
      <p>Страница не найдена</p>
      <p>Переход на главную через {count} секунд</p>
    </div>
  </div>
  );
};

export default Page404;