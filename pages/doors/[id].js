import { useRouter } from "next/router";

import MainContainer from "../../components/mainLayout/mainLayout";

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock/doors/${params.id}`);
  const door = await response.json();

  return {
      props: { door },
  };
};

export default ({ door }) => {
    const { query } = useRouter();

  return (
    <MainContainer>
      <div>Дверь {query.id} {door.name}</div>
    </MainContainer>
  )
};
