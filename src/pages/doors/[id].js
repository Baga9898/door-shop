// Refactoring need
import { useState, useEffect } from 'react';

import { notify }    from '../../components/shared/notify/notify';
import MainContainer from "../../components/mainLayout/mainLayout";

import styles from './styles.module.scss';

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`http://localhost:5000/api/doors/${params.id}`);
  const door = await response.json();

  return {
      props: { door },
  };
};

export const getStaticPaths = async () => {
  const response = await fetch(`http://localhost:5000/api/doors`);
  const doors = await response.json();

  const paths = doors.map((door) => {
    return { params: { id: door._id.toString() } };
  });

  return {
    paths,
    fallback: false,
  }
};

export default ({ door }) => {
  const [chosenSize, setChosenSize] = useState('');
  const [inCart, setInCart] = useState([]);

  const addToCart = () => {
    if (chosenSize === '') {
      notify('warn', 'Выберите размер')
      return;
    }

    let cartDoors = JSON.parse(localStorage.getItem('cartDoors')) || [];
    door.chosenSize = chosenSize;
    door.count = 1;
    cartDoors.push(door);
    localStorage.setItem('cartDoors', JSON.stringify(cartDoors));
    setInCart(cartDoors);
    notify('success', 'Товар успешно добавлен в корзину');
  };

  const isInCart = (article, size) => { // Вынести в хелпер.
    return inCart.map(cartDoor => cartDoor.article).includes(article) && inCart.map(cartDoor => cartDoor.chosenSize).includes(size);
  };

  useEffect(() => {
    if (localStorage.getItem('cartDoors')) {
      setInCart(JSON.parse(localStorage.getItem('cartDoors')));
    }
  }, []);

  const alreadyInCart = () => {
    notify('info', 'Товар уже добавлен в корзину');
  };

  console.log(door);

  return (
    <MainContainer>
      <section className={styles.currentDoor}>
        <div className={styles.upSide}>
          <div>
            <img src={`http://localhost:5000/${door.image}`} alt={door.name} />
          </div>
          <div className={styles.rightSide}>
            <div>
              <p className={styles.article}>Арт. {door.article}</p>
              <p className={styles.doorName}>{door.name}</p>
              <p className={styles.sizesParagraph}>{'Размеры двери (см):'}</p>
              <div className={styles.sizes}>
                {door.sizes && door.sizes.toString().split(',').map(size => (
                  <li 
                    key={size} 
                    className={size === chosenSize && styles.active}
                    onClick={() => setChosenSize(size)}
                  >
                    {size}
                  </li>
                ))}
              </div>
            </div>
            <div>
              <p className={styles.price}>{door.price} &#8381;/шт.</p>
              {isInCart(door.article, chosenSize) ?
                <button onClick={alreadyInCart}>В корзине</button> :
                <button onClick={addToCart}>В корзину</button>
              }
            </div>
          </div>
        </div>
        <div className={styles.downSide}>
          <div>
            <h2>Характеристики</h2>
            {/* Вынести в массив объектов. И написать функцию для высчитывания количества точек между свойством и значением.*/}
            <p>Категория           <span>...................................................................................</span> {door.category}</p>
            <p>Цвет                <span>............................................................................................</span> {door.color}</p>
            <p>Конструкция         <span>...............................................................................</span> {door.construction}</p>
            <p>Страна производства <span>................................................................</span> {door.country}</p>
            <p>Покрытие            <span>....................................................................................</span> {door.surface}</p>
            <p>Материал            <span>....................................................................................</span> {door.material}</p>
          </div>
          <h2>Описание</h2>
          <p>{door.description}</p>
        </div>
      </section>
    </MainContainer>
  )
};
