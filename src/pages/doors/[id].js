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
        <div>
          <img src={`http://localhost:5000/${door.image}`} alt={door.name} />
        </div>
        <div>
          <p>Арт. {door.article}</p>
          <p>{door.name}</p>
          <p>{'Размеры двери (см):'}</p>
          <div> {/* Вынести в массив. */}
            <div>200 x 60</div>
            <div>200 x 70</div>
            <div>200 x 80</div>
            <div>200 x 90</div>
          </div>
          <p>{door.price} &#8381;/шт.</p>
          <button>В корзину</button>
        </div>
      </section>
    </MainContainer>
  )
};
