import MainContainer from "../../components/mainLayout/mainLayout";

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
      <div>Дверь {door._id} {door.name}</div>
    </MainContainer>
  )
};
