// Refactoring need
import { useState, useEffect } from 'react';

import { directions } from '../../constants';
import { isInCart }   from '../../utils';
import { notify }     from '../../components/shared/notify/notify';
import MainContainer  from "../../components/mainLayout/mainLayout";

import styles from './styles.module.scss';

export const getStaticProps = async ({ params }) => {
  const basePath = process.env.NEXT_PUBLIC_API_LINK;
  const response = await fetch(`${basePath}/api/doors/${params.id}`);
  const door = await response.json();

  return {
    props: { door },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const basePath = process.env.NEXT_PUBLIC_API_LINK;
  const response = await fetch(`${basePath}/api/doors`);
  const doors = await response.json();

  const paths = doors.map((door) => {
    return { params: { id: door._id.toString() } };
  });

  return {
    paths,
    fallback: false, // Проверить вариант работы со значением 'blocking'.
  }
};

export default ({ door }) => {
  const [chosenSize, setChosenSize] = useState('');
  const [chosenDirection, setChosenDirection] = useState(directions[0]);
  const [inCart, setInCart] = useState([]);

  const basePath = process.env.NEXT_PUBLIC_API_LINK;
  const customDescription = `Купить дверь ${door.name} артикул ${door.article}`

  const addToCart = () => {
    if (chosenSize === '') {
      notify('warn', 'Выберите размер')
      return;
    }

    let cartDoors = JSON.parse(localStorage.getItem('cartDoors')) || [];
    door.chosenSize = chosenSize;
    door.direction = chosenDirection;
    door.count = 1;
    cartDoors.push(door);
    localStorage.setItem('cartDoors', JSON.stringify(cartDoors));
    setInCart(cartDoors);
    notify('success', 'Товар успешно добавлен в корзину');
  };

  useEffect(() => {
    if (localStorage.getItem('cartDoors')) {
      setInCart(JSON.parse(localStorage.getItem('cartDoors')));
    }
  }, []);

  const alreadyInCart = () => {
    notify('info', 'Товар уже добавлен в корзину');
  };

  return (
    <MainContainer 
      keywords={`${door.article}, ${door.name}`} 
      title={`Купить ${door.name} ${door.article}`}
      customDescription={customDescription}
    >
      <section className={styles.currentDoor}>
        <div className={styles.upSide}>
          <div className={styles.imageWrapper}>
            <img src={`${basePath}/${door.image}`} alt={door.name} />
          </div>
          <div className={styles.rightSide}>
            <div>
              <p className={styles.article}>Арт. {door.article}</p>
              <h1 className={styles.doorName}>{door.name}</h1>
              <p className={styles.specParagraph}>{'Размеры двери (см):'}</p>
              <div className={styles.specWrapper}>
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
              {door.withLeftRight &&
                <>
                  <p className={styles.specParagraph}>{'Направление открывания:'}</p>
                  <div className={styles.specWrapper}>
                    {directions && directions.map(direction => (
                      <li 
                        key={direction}
                        className={direction === chosenDirection && styles.active}
                        onClick={() => setChosenDirection(direction)}
                      >
                        {direction}
                      </li>
                    ))}
                  </div>
                </>
              }
            </div>
            <div>
              <p className={styles.price}>{door.price} &#8381;/шт.</p>
              {isInCart(inCart, door.article, chosenSize, chosenDirection) ?
                <button onClick={alreadyInCart}>В корзине</button> :
                <button onClick={addToCart}>В корзину</button>
              }
            </div>
          </div>
        </div>
        <div className={styles.downSide}>
          <div className={styles.specs}>
            <h2>Характеристики</h2>
            <p>Категория:           <span>{door.category}</span></p>
            <p>Цвет:                <span>{door.color}</span></p>
            <p>Конструкция:         <span>{door.construction}</span></p>
            <p>Страна производства: <span>{door.country}</span></p>
            <p>Покрытие:            <span>{door.surface}</span></p>
            <p>Материал:            <span>{door.material}</span></p>
          </div>
          <div className={styles.description}>
            <h2>Описание</h2>
            <p>{door.description}</p>
          </div>
        </div>
      </section>
    </MainContainer>
  )
};
