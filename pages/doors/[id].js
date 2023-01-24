import { useRouter } from "next/router";

export default () => {
    const { query } = useRouter();

  return (
    <div>Дверь {query.id}</div>
  )
};
