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
              <div className={styles.sizes}> {/* Вынести в массив. */}
                <li>200 x 60</li>
                <li>200 x 70</li>
                <li>200 x 80</li>
                <li>200 x 90</li>
              </div>
            </div>
            <div>
              <p className={styles.price}>{door.price} &#8381;/шт.</p>
              <button>В корзину</button>
            </div>
          </div>
        </div>
      </section>
    </MainContainer>
  )
};
