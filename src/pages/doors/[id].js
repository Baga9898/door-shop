import MainContainer from "../../components/mainLayout/mainLayout";

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors/${params.id}`);
  const door = await response.json();

  return {
      props: { door },
  };
};

export const getStaticPaths = async () => {
  const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors/`);
  const doors = await response.json();

  const paths = doors.map((door) => {
    return { params: { id: door.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  }
};

export default ({ door }) => {
  return (
    <MainContainer>
      <div>Дверь {door.id} {door.name}</div>
    </MainContainer>
  )
};
